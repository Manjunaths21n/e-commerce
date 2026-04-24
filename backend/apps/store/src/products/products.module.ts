import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product, Category } from 'data-layer';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';

@Module({
  imports: [MikroOrmModule.forFeature([Product, Category])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
