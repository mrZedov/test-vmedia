import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Controller, Get, Req, Res} from '@nestjs/common';
import {ProxyEndpoint} from 'src/shared/endpoints/proxy.endpoint';
import {ProxyService} from '../services/proxy.service';
import {Request, Response} from 'express';

@ApiTags(ProxyEndpoint.ApiTags)
@Controller(ProxyEndpoint.Controller.GroupAPI)
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('*')
  @ApiOkResponse({type: 'Ok'})
  public async getRequest(@Req() request: Request, @Res() response: Response) {
    const content = await this.proxyService.getAndModify(request.url);
    response.send(content);
  }
}
