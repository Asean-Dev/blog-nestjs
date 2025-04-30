import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { RouterModule } from '@nestjs/core';
import { BlogModule } from './api/blog/blog.module';

@Module({
  imports: [
    ApiModule,
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
        children: [
          {
            path: 'user',
            module: UserModule,
          },
          {
            path: 'blog',
            module: BlogModule,
          },
        ],
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
