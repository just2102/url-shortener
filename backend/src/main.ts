import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UrlShortenerValidationPipe } from './general/validation/UrlShortener.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new UrlShortenerValidationPipe());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
