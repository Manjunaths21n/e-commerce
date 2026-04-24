import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() body: any) {
    // For now, we expect userId in body, but in real app it would come from req.user
    return this.ordersService.createOrder(body.userId, body.items);
  }

  @Get()
  async findAll(@Request() req: any) {
     // Expect userId in query for now
     return this.ordersService.findAllByUser(req.query.userId);
  }
}
