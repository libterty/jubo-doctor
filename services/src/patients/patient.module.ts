import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PatientController } from '@server/patients/patient.controller'
import { PatientService } from '@server/patients/patient.service'
import { PatientRepository } from '@server/patients/patient.repository'

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PatientRepository])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
