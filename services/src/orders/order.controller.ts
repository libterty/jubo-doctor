import { Controller, Post, Body, ValidationPipe, Get, Param, Query, Put } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import Order from '@server/entities/Order'
import { OrderService } from '@server/orders/order.service';
import { OrderGetDto ,OrderFindDto, OrderCreateDto, OrderUpdateDto } from '@server/orders/dtos'
import { config } from '@server/config/general'
import { ERoutesMap } from '@server/shares/enums'

@ApiTags(ERoutesMap.ORDER.toUpperCase())
@ApiHeader({
  name: `${config.NAME}-Order`,
  description: 'Order Service',
})
@Controller(ERoutesMap.ORDER)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findOrders(@Query(ValidationPipe) searchDto: OrderFindDto): Promise<{
      data: Partial<Order>[]
      count: number
      limit: number
      offset: number
    }> {
    return this.orderService.findOrders(searchDto);
  }

  @Get('/:id')
  getOrderById(@Param(ValidationPipe) orderGetDto: OrderGetDto): Promise<Partial<Order>> {
    return this.orderService.getOrderById(orderGetDto);
  }

  @Post()
  createOrder(@Body(ValidationPipe) orderCreateDto: OrderCreateDto): Promise<Partial<Order>> {
    return this.orderService.createOrder(orderCreateDto);
  }

  @Put('/:id')
  updateOrderById(@Param(ValidationPipe) orderGetDto: OrderGetDto, @Body(ValidationPipe) orderUpdateDto: OrderUpdateDto): Promise<Partial<Order>> {
    return this.orderService.updateOrderById(orderGetDto, orderUpdateDto);
  }
}
