import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { GoogleOAuthGuard } from './guard/google.guard';
import {
  GoogleUserContext,
  RefreshTokensResponse,
  UserRefreshTokenContext,
} from './auth.types';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guard/jwtRefresh.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('/google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(
    @Req() req: GoogleUserContext,
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.handleGoogleLogin(req.user);

    res.redirect(
      `${process.env.FRONTEND_URL}/auth/google-redirect?accessToken=${accessToken}&refreshToken=${refreshToken}`,
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/refreshToken')
  async refreshToken(
    @Req() req: UserRefreshTokenContext,
  ): Promise<RefreshTokensResponse> {
    const user = req.user;
    return await this.authService.refreshTokens(user.email, user.refreshToken);
  }
}
