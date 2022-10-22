import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IsPatient, IsOrder } from "@server/libs/patient.validation";
import { Nullable } from "@server/shares/types";

export class OrderUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Order message cannot be empty'
  })
  @MaxLength(4096, {
    message: 'Order message too long'
  })
  public message?: Nullable<string>

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPatient()
  public patientId?: Nullable<number>
}