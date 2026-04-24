import { Seeder } from '@mikro-orm/seeder';
import { EntityManager } from '@mikro-orm/core';
import { Category } from '../entities/Category.js';
import { Product } from '../entities/Product.js';
import { User } from '../entities/User.js';
import bcrypt from 'bcrypt';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // Create Category
    const electronics = em.create(Category, { name: 'Electronics' } as any);
    const clothing = em.create(Category, { name: 'Clothing' } as any);

    // Create Products
    em.create(Product, {
      name: 'iPhone 15',
      description: 'The latest iPhone',
      price: 999.99,
      imageUrl: 'https://example.com/iphone15.jpg',
      category: electronics,
      stock: 50,
    } as any);

    em.create(Product, {
      name: 'MacBook Pro',
      description: 'Powerful laptop',
      price: 1999.99,
      imageUrl: 'https://example.com/macbook.jpg',
      category: electronics,
      stock: 20,
    } as any);

    em.create(Product, {
      name: 'T-Shirt',
      description: 'Cotton t-shirt',
      price: 19.99,
      imageUrl: 'https://example.com/tshirt.jpg',
      category: clothing,
      stock: 100,
    } as any);

    // Create a default user
    const hashedPassword = await bcrypt.hash('password123', 10);
    em.create(User, {
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
      role: 'user',
    } as any);

    await em.flush();
  }
}
