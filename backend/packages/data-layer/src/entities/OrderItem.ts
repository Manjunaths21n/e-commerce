import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity.js';
import { Order } from './Order.js';
import { Product } from './Product.js';

@Entity()
export class OrderItem extends BaseEntity {
  @ManyToOne(() => Order)
  order!: Order;

  @ManyToOne(() => Product)
  product!: Product;

  @Property()
  quantity!: number;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  priceAtPurchase!: number;
}
