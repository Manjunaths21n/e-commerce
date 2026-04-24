import { Entity, Property, Unique, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity.js';
import { Product } from './Product.js';

@Entity()
export class Category extends BaseEntity {
  @Property()
  @Unique()
  name!: string;

  @OneToMany(() => Product, (product) => product.category)
  products = new Collection<Product>(this);
}
