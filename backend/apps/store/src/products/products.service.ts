import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Product } from 'data-layer';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll({ populate: ['category'] as any });
  }

  async findOne(id: string): Promise<Product | null> {
    return this.productRepository.findOne({ id }, { populate: ['category'] as any });
  }
}
