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
import * as bcrypt from 'bcrypt';

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

  public async createUser({ email, name }: CreateUserPayload) {
    const createdUser = await this.userDbService.createUser({
      email,
      name,
    });
    if (!createdUser) throw new UserCreationError();
    return createdUser;
  }

  public async updateRefreshToken({
    email,
    hashedRefreshToken,
  }: UpdateRefreshTokenPayload) {
    return await this.userDbService.updateRefreshToken({
      email,
      hashedRefreshToken,
    });
  }

  public async generateAndUpdateTokens({
    email,
    userId,
  }: GenerateTokenPayload): Promise<GenerateTokensResponse> {
    const accessToken = this.generateAccessToken({
      email: email,
      userId: userId,
    });
    const refreshToken = this.generateRefreshToken({
      email: email,
      userId: userId,
    });

    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.updateRefreshToken({
      email: email,
      hashedRefreshToken,
    });
    return { accessToken, refreshToken };
  }

  private async hashData(data: string) {
    const SALT_NUMBER = 10;
    return await bcrypt.hash(data, SALT_NUMBER);
  }

  private generateAccessToken({ email, userId }: GenerateTokenPayload): string {
    const payload = { email: email, userId: userId };
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }

  private generateRefreshToken({
    email,
    userId,
  }: GenerateTokenPayload): string {
    const payload = { email: email, userId: userId };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }
}
