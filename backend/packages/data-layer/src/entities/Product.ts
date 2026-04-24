import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity.js';
import { Category } from './Category.js';

@Entity()
export class Product extends BaseEntity {
  @Property()
  name!: string;

  @Property({ columnType: 'text' })
  description!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Property()
  imageUrl!: string;

  @ManyToOne(() => Category)
  category!: Category;

  @Property({ default: 0 })
  stock: number = 0;
}
