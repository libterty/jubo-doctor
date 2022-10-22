import { ApiProperty } from '@nestjs/swagger'
import { QueryBaseDtos } from '@server/shares/dtos/paging.dto'
import { IsUUID } from 'class-validator'

export class OrderFindDto extends QueryBaseDtos {
  @ApiProperty()
  @IsUUID()
  public patientId: string
}
