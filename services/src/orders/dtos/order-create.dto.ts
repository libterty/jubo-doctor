import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator'
import { IsPatient } from '@server/libs/patient.validation'

export class OrderCreateDto {
  @ApiProperty()
  @IsString()
  @MinLength(1, {
    message: 'Order message cannot be empty',
  })
  @MaxLength(4096, {
    message: 'Order message too long',
  })
  public message: string

  @ApiProperty()
  @IsUUID()
  @IsPatient()
  public patientId: string
}
