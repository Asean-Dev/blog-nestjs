import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { JwtStrategy } from 'src/helpers/jwt/jwt.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [BlogController],
  providers: [BlogService, JwtStrategy],
})
export class BlogModule {}
