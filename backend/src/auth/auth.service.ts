import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthLoginResponse, GoogleUser } from './auth.types';
import { EmailUndefined } from './errors/EmailUndefined';
import { FirstNameUndefined } from './errors/FirstNameUndefined';
import * as bcrypt from 'bcrypt';
import { InvalidRefreshToken } from './errors/InvalidRefreshToken';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async handleGoogleLogin(user: GoogleUser): Promise<AuthLoginResponse> {
    if (!user.email) throw new EmailUndefined();
    if (!user.firstName) throw new FirstNameUndefined();

    const existingUser = await this.userService.findByEmail(user.email);
    if (!existingUser) {
      const createdUser = await this.userService.createUser({
        email: user.email,
        name: user.firstName,
      });
      const { accessToken, refreshToken } =
        await this.userService.generateAndUpdateTokens({
          email: createdUser.email,
          userId: createdUser._id,
        });
      return {
        accessToken,
        refreshToken,
        user: createdUser,
      };
    }

    const { accessToken, refreshToken } =
      await this.userService.generateAndUpdateTokens({
        email: existingUser.email,
        userId: existingUser._id,
      });
    return {
      accessToken,
      refreshToken,
      user: existingUser,
    };
  }

  private async hashCompare(providedData: string, hashedData: string) {
    return await bcrypt.compare(providedData, hashedData);
  }

  public async refreshTokens(email: string, oldRefreshToken: string) {
    const user = await this.userService.parseUserFromEmail(email);
    if (!(await this.hashCompare(oldRefreshToken, user.refreshToken))) {
      throw new InvalidRefreshToken();
    }

    const { accessToken, refreshToken } =
      await this.userService.generateAndUpdateTokens({
        email: user.email,
        userId: user._id,
      });
    return { accessToken, refreshToken };
  }
}
