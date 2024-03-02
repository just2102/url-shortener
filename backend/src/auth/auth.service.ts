import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthLoginResponse, GoogleUser } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async handleGoogleLogin(user: GoogleUser): Promise<AuthLoginResponse> {
    if (!user.email) throw new Error('User email is not defined');
    if (!user.firstName) throw new Error('User first name is not defined');

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
