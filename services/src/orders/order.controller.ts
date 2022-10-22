import { Controller, Post, Body, ValidationPipe, Get, Param, Query, Patch } from '@nestjs/common'
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger'
import Order from '@server/entities/Order'
import { OrderService } from '@server/orders/order.service'
import { OrderGetDto, OrderFindDto, OrderCreateDto, OrderUpdateDto } from '@server/orders/dtos'
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
  @ApiResponse({ status: 200, description: 'Find order success' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findOrders(
    @Query(ValidationPipe) searchDto: OrderFindDto,
  ): Promise<{
    data: Partial<Order>[]
    count: number
    limit: number
    offset: number
  }> {
    return this.orderService.findOrders(searchDto)
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Get order by id success' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getOrderById(@Param(ValidationPipe) orderGetDto: OrderGetDto): Promise<Partial<Order>> {
    return this.orderService.getOrderById(orderGetDto)
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create order success' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  createOrder(@Body(ValidationPipe) orderCreateDto: OrderCreateDto): Promise<Partial<Order>> {
    return this.orderService.createOrder(orderCreateDto)
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, description: 'Update order by id success' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  updateOrderById(
    @Param(ValidationPipe) orderGetDto: OrderGetDto,
    @Body(ValidationPipe) orderUpdateDto: OrderUpdateDto,
  ): Promise<Partial<Order>> {
    return this.orderService.updateOrderById(orderGetDto, orderUpdateDto)
  }
}
