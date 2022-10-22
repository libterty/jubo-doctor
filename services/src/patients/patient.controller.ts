import {
  Controller,
  Get,
  Query,
  ValidationPipe,
} from '@nestjs/common'
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger'
import Patient from '@server/entities/Patient'
import { PatientoService } from '@server/patients/patient.service'
import { QueryBaseDtos } from '@server/shares/dtos/paging.dto'
import { config } from '@server/config/general'
import { ERoutesMap } from '@server/shares/enums'

@ApiTags(ERoutesMap.PATIENT.toUpperCase())
@ApiHeader({
  name: `${config.NAME}-Patient`,
  description: 'Patient Service',
})
@Controller(ERoutesMap.PATIENT)
export class PatientController {
  constructor(private patientoService: PatientoService) {}

  @Get('/')
  @ApiResponse({ status: 200, description: 'Get patient success' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findPatients(
      @Query(ValidationPipe) queryBaseDtos: QueryBaseDtos,
  ): Promise<{
        data: Partial<Patient>[]
        count: number
        limit: number
        offset: number
      }> {
    return this.patientoService.findPatients(queryBaseDtos)
  }

}
