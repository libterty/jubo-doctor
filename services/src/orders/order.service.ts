import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Order from '@server/entities/Order'
import { OrderRepository } from '@server/orders/order.repository'
import { OrderGetDto, OrderFindDto, OrderCreateDto, OrderUpdateDto } from '@server/orders/dtos'
import { ERoutesMap } from '@server/shares/enums'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}

  public async getOrderById(orderGetDto: OrderGetDto): Promise<Partial<Order>> {
    return await this.orderRepository.getOrderById(orderGetDto.id)
  }

  public async findOrders(
    orderFindDto: OrderFindDto,
  ): Promise<{
    data: Partial<Order>[]
    count: number
    limit: number
    offset: number
    currentPage: number
    totalPages: number
  }> {
    try {
      if (!orderFindDto.limit) orderFindDto.limit = '10'
      if (!orderFindDto.offset) orderFindDto.offset = '0'
      const result = await this.orderRepository.findOrders(orderFindDto)
      return Object.assign(result, {
        limit: Number(orderFindDto.limit),
        offset: Number(orderFindDto.offset),
        currentPage: Number(orderFindDto.offset),
        totalPages: Math.ceil(Number(orderFindDto.limit) / Number(orderFindDto.offset))
      })
    } catch (error) {
      Logger.error(error.message, 'findOrders', 'OrderService', true)
      throw error
    }
  }

  public async createOrder(dto: OrderCreateDto): Promise<Partial<Order>> {
    const order = await this.orderRepository.createOrder(dto)
    if (!order) throw new InternalServerErrorException(dto, `Create order fails`)
    return await this.orderRepository.getOrderById(order.id)
  }

  public async updateOrderById(
    orderGetDto: OrderGetDto,
    orderUpdateDto: OrderUpdateDto,
  ): Promise<Partial<Order>> {
    const order = await this.orderRepository.updateOrderById(orderGetDto, orderUpdateDto)
    if (!order)
      throw new InternalServerErrorException(
        Object.assign(orderGetDto, orderUpdateDto),
        `Update order fails`,
      )
    return await this.orderRepository.getOrderById(order.id)
  }
}
