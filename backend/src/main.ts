// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ВАЖЛИВИЙ РЯДОК ДЛЯ CORS
  app.enableCors();

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`); // Додамо лог, щоб бачити порт
}
bootstrap();
