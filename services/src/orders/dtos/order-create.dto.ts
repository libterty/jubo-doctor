import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { IsPatient } from "@server/libs/patient.validation";

export class OrderCreateDto {
  @ApiProperty()
  @IsString()
  @MinLength(1, {
    message: 'Order message cannot be empty'
  })
  @MaxLength(4096, {
    message: 'Order message too long'
  })
  public message: string

  @ApiProperty()
  @IsNumber()
  @IsPatient()
  public patientId: number
}