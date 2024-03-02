import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { GoogleOAuthGuard } from './guard/google.guard';
import { GoogleUserContext } from './auth.types';
import { AuthService } from './auth.service';

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
}
