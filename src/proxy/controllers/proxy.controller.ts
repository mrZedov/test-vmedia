import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {Controller, Get, Req, Res} from '@nestjs/common';
import {ProxyEndpoint} from 'src/shared/endpoints/proxy.endpoint';
import {ProxyService} from '../services/proxy.service';
import {Request, Response} from 'express';

@ApiTags(ProxyEndpoint.ApiTags)
@Controller(ProxyEndpoint.Controller.GroupAPI)
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get(ProxyEndpoint.Controller.All)
  @ApiOperation({description: "Get the request and modify it's content"})
  public async getRequest(@Req() request: Request, @Res() response: Response) {
    const content = await this.proxyService.getAndModify(request.url);
    response.send(content);
  }
}
