"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const all_exception_filter_1 = require("./common/filters/all-exception.filter");
async function bootstrap() {
    const logger = new common_1.Logger('NestApplication');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new all_exception_filter_1.AllExceptionsFilter());
    await app.listen(process.env.PORT ?? 3000, () => {
        logger.log(`Started on port ${process.env.PORT}`);
    });
    console.log(`\nApplication is running on: \x1b[32mhttp://localhost:${process.env.PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map