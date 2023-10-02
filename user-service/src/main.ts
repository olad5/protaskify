import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { ApiServerConfig } from './infrastructure/config/ApiServerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = ApiServerConfig.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 User Service Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
