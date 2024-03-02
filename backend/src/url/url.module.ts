import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { RedisModule } from 'src/cache/redis/redis.module';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './url.schema';
import { UrlDbService } from './url.db';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
    RedisModule,
    UserModule,
  ],
  controllers: [UrlController],
  providers: [UrlService, UrlDbService],
  exports: [UrlService],
})
export class UrlModule {}
