import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      validationError: {
        target: false,
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
