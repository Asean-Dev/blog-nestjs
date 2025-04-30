import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/helpers/jwt/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
