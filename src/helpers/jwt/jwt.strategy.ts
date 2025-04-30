// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // 👈 หรือ hardcoded ชั่วคราว
    });
  }

  async validate(payload: JwtPayload) {
    return { id: payload.id, userName: payload.userName, uuid: payload.uuid };
  }
}
