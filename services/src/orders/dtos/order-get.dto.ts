import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { IsOrder } from '@server/libs/async.validation'

export class OrderGetDto {
  @ApiProperty()
  @IsUUID()
  @IsOrder()
  public id: string
}
