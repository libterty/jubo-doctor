import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { IsOrder } from "@server/libs/patient.validation";

export class OrderGetDto {
  @ApiProperty()
  @IsNumber()
  @IsOrder()
  public id: number
}