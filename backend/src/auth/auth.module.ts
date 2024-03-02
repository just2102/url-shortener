import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenStrategy } from './strategy/jwtAccessToken.strategy';
import { JwtRefreshTokenStrategy } from './strategy/jwtRefreshToken.strategy';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategy/googleOauth.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
    UserModule,
  ],
  providers: [
    AuthService,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    GoogleStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
