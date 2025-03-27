import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n'; // Đây là pipe cần sử dụng
import { ValidationExceptionFilter } from './validation/filter';
import { I18nValidationException } from 'nestjs-i18n';
import { ValidationPipe } from '@nestjs/common';
import { DtoValidationExceptionFilter } from './validation/dto_filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new DtoValidationExceptionFilter);
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();