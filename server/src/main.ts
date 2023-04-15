import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PaginationResponse } from './interceptors/paginationResponse.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

	app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new PaginationResponse());

  await app.listen(8080);
}
bootstrap();
