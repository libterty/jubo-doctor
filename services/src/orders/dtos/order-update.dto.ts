import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator'
import { IsPatient } from '@server/libs/async.validation'
import { Nullable } from '@server/shares/types'

export class OrderUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Order message cannot be empty',
  })
  @MaxLength(4096, {
    message: 'Order message too long',
  })
  public message?: Nullable<string>

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  @IsPatient()
  public patientId?: Nullable<string>
}
