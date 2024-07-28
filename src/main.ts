import {Logger} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = process.env.API_PREFIX;
  if (globalPrefix) {
    app.setGlobalPrefix(globalPrefix);
  }

  const config = new DocumentBuilder().setTitle('Test for VMedia').setDescription('Test for VMedia Server REST API').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document, {
    swaggerOptions: {tagsSorter: 'alpha', operationsSorter: 'alpha'},
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log('info', `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();
