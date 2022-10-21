import { Controller, Get } from '@nestjs/common'
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger'
import { HealthService } from '@server/healths/health.service'
import * as IShare from '@server/shares/interfaces'
import { config } from '@server/config/general'

@ApiTags('healths')
@ApiHeader({
  name: `${config.NAME}-Healths`,
  description: 'Health ping check service',
})
@Controller('healths')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/')
  @ApiResponse({ status: 200, description: `${config.name}-Health-check-Success` })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getRequest(): IShare.IResponseBase<string> {
    return this.healthService.getRequest()
  }
}
