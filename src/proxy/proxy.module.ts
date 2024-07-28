import {Module} from '@nestjs/common';
import {ProxyService} from './services/proxy.service';
import {ProxyController} from './controllers/proxy.controller';

@Module({
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class ProxyModule {}
