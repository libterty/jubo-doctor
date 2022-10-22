
import { ApiProperty } from '@nestjs/swagger'
import { QueryBaseDtos } from '@server/shares/dtos/paging.dto'
import { IsNumberString } from 'class-validator'

export class OrderFindDto extends QueryBaseDtos {
  @ApiProperty()
  @IsNumberString()
  public patientId: string
}