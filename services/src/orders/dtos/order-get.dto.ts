import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { IsOrder } from '@server/libs/patient.validation'

export class OrderGetDto {
  @ApiProperty()
  @IsUUID()
  @IsOrder()
  public id: string
}
