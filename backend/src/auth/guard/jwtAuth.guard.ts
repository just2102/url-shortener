import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const JWT_AUTH_GUARD_NAME = 'jwt';
@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_AUTH_GUARD_NAME) {}

@Injectable()
export class ApplyUser extends AuthGuard(JWT_AUTH_GUARD_NAME) {
  handleRequest(err: unknown, user: any) {
    return user ?? null;
  }
}
