import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Order, OrderItem, User, Product } from 'data-layer';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: EntityRepository<Order>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async createOrder(userId: string, items: { productId: string; quantity: number }[]) {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) throw new Error('User not found');

    const storeServiceUrl = this.configService.get('STORE_SERVICE_URL');
    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    const order = this.orderRepository.create({
      user,
      totalAmount: 0,
      status: 'pending',
    } as any);

    for (const item of items) {
      // Validate product and price with store service
      const response = await firstValueFrom(
        this.httpService.get(`${storeServiceUrl}/products/${item.productId}`),
      );
      const productData = response.data;

      if (!productData) throw new Error(`Product ${item.productId} not found`);

      const price = parseFloat(productData.price);
      totalAmount += price * item.quantity;

      const orderItem = new OrderItem();
      orderItem.order = order;
      // We might not have the product in our local DB if it's a separate DB,
      // but here they share the same DB via data-layer.
      // In a real microservice, we might just store the productId as a string.
      // For this implementation, we'll assume they share the DB.
      const product = await this.productRepository.findOne({ id: item.productId });
      orderItem.product = product!;
      orderItem.quantity = item.quantity;
      orderItem.priceAtPurchase = price;

      orderItems.push(orderItem);
    }

    order.totalAmount = totalAmount;
    await this.orderRepository.getEntityManager().persistAndFlush(order);
    for (const oi of orderItems) {
      await this.orderRepository.getEntityManager().persistAndFlush(oi);
    }

    return order;
  }

  async findAllByUser(userId: string) {
    return this.orderRepository.find({ user: { id: userId } }, { populate: ['items'] as any });
  }
}
