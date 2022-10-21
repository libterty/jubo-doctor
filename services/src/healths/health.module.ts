import { Logger, Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { HealthService } from './health.service'

// import { config } from '../../config';

@Module({
  controllers: [HealthController],
  providers: [Logger, HealthService],
})
export class HealthModule {}
