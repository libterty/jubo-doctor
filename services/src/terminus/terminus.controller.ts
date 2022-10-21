import { Controller, Get } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  HealthCheckResult,
} from '@nestjs/terminus'
import { config } from '@server/config/general'

@ApiTags('pings')
@ApiHeader({
  name: `${config.NAME}-pings`,
  description: 'Ping check service',
})
@Controller('pings')
export class PingController {
  private readonly healthServicePath = `${config.PROTOCL}://${config.HOST}:${config.PORT}${config.API_EXPLORER_PATH}/${config.PREFIX}/healths`

  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([() => this.http.pingCheck('Health-Services', this.healthServicePath)])
  }
}
