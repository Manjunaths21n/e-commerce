import { Entity, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity.js';
import { User } from './User.js';
import { OrderItem } from './OrderItem.js';

@Entity()
export class Order extends BaseEntity {
  @ManyToOne(() => User)
  user!: User;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount!: number;

  @Property()
  status: string = 'pending';

  @Property({ nullable: true })
  shippingAddress?: string;

  @OneToMany(() => OrderItem, (item) => item.order)
  items = new Collection<OrderItem>(this);
}
