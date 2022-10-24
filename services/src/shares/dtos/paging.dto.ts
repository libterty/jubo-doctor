import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional, IsString } from 'class-validator'
import { IsQueryLimitOutRange, IsUnsignedIntString } from '@server/libs/sync.validation'
import { Nullable } from '@server/shares/types'

export class QueryBaseDtos {
  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  @IsUnsignedIntString()
  public offset?: Nullable<string>

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  @IsUnsignedIntString()
  @IsQueryLimitOutRange()
  public limit?: Nullable<string>

  @ApiProperty()
  @IsOptional()
  @IsString()
  public readonly keyword?: Nullable<string>
}
