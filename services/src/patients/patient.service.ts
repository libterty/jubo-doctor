import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Patient from '@server/entities/Patient'
import { PatientRepository } from './patient.repository'
import { QueryBaseDtos } from '@server/shares/dtos/paging.dto'

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientRepository)
    private readonly patientRepository: PatientRepository,
  ) {}

  public async findPatients(
    queryBaseDtos: QueryBaseDtos,
  ): Promise<{
    data: Partial<Patient>[]
    count: number
    limit: number
    offset: number
    currentPage: number
    totalPages: number
  }> {
    try {
      if (!queryBaseDtos.limit) queryBaseDtos.limit = '10'
      if (!queryBaseDtos.offset) queryBaseDtos.offset = '0'
      const result = await this.patientRepository.findPatients(queryBaseDtos)
      return Object.assign(result, {
        limit: Number(queryBaseDtos.limit),
        offset: Number(queryBaseDtos.offset),
        currentPage: Number(queryBaseDtos.offset),
        totalPages: Math.ceil(Number(queryBaseDtos.limit) / Number(queryBaseDtos.offset))
      })
    } catch (error) {
      Logger.error(error.message, 'findTodos', 'TodoService', true)
      throw error
    }
  }
}
