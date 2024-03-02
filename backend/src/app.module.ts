import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RedirectModule } from './redirect/redirect.module';
import { KeepAliveModule } from './keep-alive/keep-alive.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: process.env.MONGODB_URL,
      }),
      inject: [ConfigService],
    }),
    UrlModule,
    AuthModule,
    UserModule,
    RedirectModule,
    KeepAliveModule,
  ],
})
export class AppModule {}
