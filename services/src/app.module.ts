import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TerminusModule } from '@nestjs/terminus'
import { HealthModule } from '@server/healths/health.module'
import { PatientModule } from '@server/patients/patient.module'
import { PingController } from '@server/terminus/terminus.controller'
import { ormConfig } from '@server/config/orm.config'

@Module({
  controllers: [PingController],
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TerminusModule,
    HealthModule,
    PatientModule
  ],
})
export class AppModule {}
