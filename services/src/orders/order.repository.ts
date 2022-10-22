/* eslint-disable lines-between-class-members */
import { Inject } from '@nestjs/common'
import { Connection, EntityRepository, Repository, SelectQueryBuilder } from 'typeorm'
import Order from '@server/entities/Order'
import Patient from '@server/entities/Patient'
import { OrderGetDto, OrderFindDto, OrderCreateDto, OrderUpdateDto } from '@server/orders/dtos'

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  protected connection!: Connection

  constructor(@Inject('CONNECTION') connection: Connection) {
    super()
    this.connection = connection
  }

  public async findOrders(
    orderFindDto: OrderFindDto,
  ) {
    const limit = Number(orderFindDto.limit)
    const offset = Number(orderFindDto.offset) * limit
    const qb: SelectQueryBuilder<Order> = this.connection
      .getRepository(Order)
      .createQueryBuilder('od')
      .where('od.patientId = :patientId', { patientId: Number(orderFindDto.patientId) })
    const count = await qb.getCount()
    const data = await qb
      .limit(limit)
      .offset(offset)
      .select([
        'od."id" AS "id"',
        'od."message" AS "message"',
        'od."patientId" AS "patientId"'
      ])
      .getRawMany<Partial<Order>>()
    return {
      data,
      count,
    }
  }

  public async getOrderById(id: number): Promise<Partial<Order>> {
    return this.connection
      .getRepository(Order)
      .createQueryBuilder('od')
      .where('od.id = :id', { id })
      .select([
        'od."id" AS "id"',
        'od."message" AS "message"',
        'od."patientId" AS "patientId"'
      ])
      .getRawOne<Partial<Order>>()
  }

  public createOrder(dto: OrderCreateDto): Promise<Order> {
    const order = new Order()
    order.message = dto.message
    order.patient = <Patient>{
      id: dto.patientId
    }
    return this.connection.getRepository(Order).save(order)
  }

  public async updateOrderById(orderGetDto: OrderGetDto, orderUpdateDto: OrderUpdateDto) {
    const order = await this.getOrderById(orderGetDto.id)
    if (orderUpdateDto.message) order.message = orderUpdateDto.message
    if (orderUpdateDto.patientId) order.patient = <Patient>{
      id: orderUpdateDto.patientId
    }
    return this.connection.getRepository(Order).save(order)
  }
}
