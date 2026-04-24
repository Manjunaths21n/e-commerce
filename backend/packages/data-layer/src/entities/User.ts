import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity.js';

@Entity()
export class User extends BaseEntity {
  @Property()
  @Unique()
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property()
  name!: string;

  @Property({ nullable: true })
  role?: string = 'user';
}
