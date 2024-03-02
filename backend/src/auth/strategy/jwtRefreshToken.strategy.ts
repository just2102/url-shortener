import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JWT_REFRESH_GUARD_NAME } from '../guard/jwtRefresh.guard';
import {
  UserInAuthContext,
  UserInAuthContextWithRefreshToken,
} from 'src/user/user.types';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH_GUARD_NAME,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  validate(
    req: Request,
    payload: UserInAuthContext,
  ): UserInAuthContextWithRefreshToken {
    const authHeader = req.get('Authorization');
    if (!authHeader) throw new Error('No auth header');

    const refreshToken = authHeader.replace('Bearer ', '').trim();

    return { ...payload, refreshToken };
  }
}
