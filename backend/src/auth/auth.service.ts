import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthLoginResponse, GoogleUser } from './auth.types';
import { EmailUndefined } from './errors/EmailUndefined';
import { FirstNameUndefined } from './errors/FirstNameUndefined';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async handleGoogleLogin(user: GoogleUser): Promise<AuthLoginResponse> {
    if (!user.email) throw new EmailUndefined();
    if (!user.firstName) throw new FirstNameUndefined();

    const existingUser = await this.userService.findByEmail(user.email);
    if (!existingUser) {
      const { accessToken, refreshToken } = this.userService.generateTokens({
        email: user.email,
        name: user.firstName,
      });
      const createdUser = await this.userService.createUser({
        email: user.email,
        name: user.firstName,
        refreshToken: refreshToken,
      });
      return {
        accessToken,
        refreshToken,
        user: createdUser,
      };
    }

    const { accessToken, refreshToken } =
      this.userService.generateTokens(existingUser);
    return {
      accessToken,
      refreshToken,
      user: existingUser,
    };
  }
}
