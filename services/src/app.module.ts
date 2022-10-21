import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TerminusModule } from '@nestjs/terminus'
import { PingController } from '@server/terminus/terminus.controller'
import { HealthModule } from '@server/healths/health.module'
import { ormConfig } from '@server/config/orm.config'

@Module({
  controllers: [PingController],
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TerminusModule,
    HealthModule,
  ],
})
export class AppModule {}
