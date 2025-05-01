import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/all-exception.filter";

async function bootstrap() {
  const logger = new Logger("NestApplication");
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
      validationError: { target: false, value: false },
    })
  );
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0", () => {
    logger.log(`🚀 Application is running on: http://localhost:${port}`);
  });
}
bootstrap();
