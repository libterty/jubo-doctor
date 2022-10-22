import { Injectable } from '@nestjs/common'
import HTTPResponse from '@server/libs/response'
import * as IShare from '@server/shares/interfaces'

@Injectable()
export class HealthService {
  private readonly hTTPResponse: HTTPResponse = new HTTPResponse()

  public getRequest(): IShare.IResponseBase<string> {
    return this.hTTPResponse.StatusOK('Server is healthly')
  }
}
