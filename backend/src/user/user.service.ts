import { Injectable } from '@nestjs/common';
import { UserDbService } from './user.db';
import {
  CreateUserPayload,
  GenerateTokenPayload,
  GenerateTokensResponse,
  UpdateRefreshTokenPayload,
} from './user.types';
import { JwtService } from '@nestjs/jwt';
import { UserNotFound } from './errors/UserNotFound';
import { UserCreationError } from './errors/UserCreationError';

@Injectable()
export class UserService {
  constructor(
    private userDbService: UserDbService,
    private jwtService: JwtService,
  ) {}

  public async findByEmail(email: string) {
    return await this.userDbService.findByEmail(email);
  }

  public async parseUserFromEmail(email: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new UserNotFound();
    return user;
  }

  public async createUser({ email, name, refreshToken }: CreateUserPayload) {
    const createdUser = await this.userDbService.createUser({
      email,
      name,
      refreshToken,
    });
    if (!createdUser) throw new UserCreationError();
    return createdUser;
  }

  public async updateRefreshToken({
    email,
    refreshToken,
  }: UpdateRefreshTokenPayload) {
    return await this.userDbService.updateRefreshToken({
      email,
      refreshToken,
    });
  }

  public generateTokens({
    email,
    name,
  }: GenerateTokenPayload): GenerateTokensResponse {
    const accessToken = this.generateAccessToken({
      email: email,
      name: name,
    });
    const refreshToken = this.generateRefreshToken({
      email: email,
      name: name,
    });

    this.updateRefreshToken({
      email: email,
      refreshToken,
    });
    return { accessToken, refreshToken };
  }

  private generateAccessToken({ email, name }: GenerateTokenPayload): string {
    const payload = { email: email, name: name };
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }

  private generateRefreshToken({ email, name }: GenerateTokenPayload): string {
    const payload = { email: email, name: name };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }
}
