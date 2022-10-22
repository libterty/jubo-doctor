import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderController } from '@server/orders/order.controller'
import { OrderService } from '@server/orders/order.service'
import { OrderRepository } from '@server/orders/order.repository'

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([OrderRepository])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
