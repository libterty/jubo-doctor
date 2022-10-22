import { Logger, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PatientController } from '@server/patients/patient.controller'
import { PatientoService } from '@server/patients/patient.service'
import { Patientepository } from '@server/patients/patient.repository'

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Patientepository])],
  controllers: [PatientController],
  providers: [Logger, PatientoService],
})
export class PatientModule {}
