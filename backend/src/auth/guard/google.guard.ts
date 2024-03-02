import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';

export const GOOGLE_GUARD_NAME = 'google';
@Injectable()
export class GoogleOAuthGuard extends AuthGuard(GOOGLE_GUARD_NAME) {
  constructor() {
    super({
      accessType: 'offline',
    });
  }

  getAuthenticateOptions(
    context: ExecutionContext,
  ): IAuthModuleOptions | undefined {
    const req = context.switchToHttp().getRequest();
    if (req.query.state) return undefined;
    const source = req.query?.source;
    return {
      state: JSON.stringify({
        source,
      }),
    };
  }
}
