import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000, () => {
    logger.log(`Started on port ${process.env.PORT}`);
  });

  console.log(
    `\nApplication is running on: \x1b[32mhttp://localhost:${process.env.PORT}`,
  );
}
bootstrap();
