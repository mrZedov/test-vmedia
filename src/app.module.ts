import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ProxyModule} from './proxy/proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `services/.backend.env.${process.env.NODE_ENV}`,
    }),
    ProxyModule,
  ],
})
export class AppModule {}
