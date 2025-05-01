"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const all_exception_filter_1 = require("./common/filters/all-exception.filter");
async function bootstrap() {
    const logger = new common_1.Logger("NestApplication");
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new all_exception_filter_1.AllExceptionsFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
        validationError: { target: false, value: false },
    }));
    app.enableCors();
    const port = process.env.PORT || 3000;
    await app.listen(port, "0.0.0.0", () => {
        logger.log(`🚀 Application is running on: http://localhost:${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map