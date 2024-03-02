import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from './url.schema';
import { Model } from 'mongoose';
import { CacheShortUrlInternalDto, SaveUrlForUserInternalDto } from './url.dto';
import { RedisClientType } from '@redis/client';
import { UrlFailedToCache } from './errors/UrlFailedToCache';
import { UrlFailedToSave } from './errors/UrlFailedToSave';

@Injectable()
export class UrlDbService {
  private TEN_HOURS_IN_SECONDS = 36_000;
  private hashName = 'shortLinks';

  constructor(
    @InjectModel(Url.name)
    private urlModel: Model<UrlDocument>,
    @Inject('REDIS_CLIENT') private redisClient: RedisClientType,
  ) {}

  public async saveUrlForUser({
    originalLink,
    shortLink,
    userId,
  }: SaveUrlForUserInternalDto) {
    const url: Url = await this.urlModel.create({
      originalLink,
      shortLink,
      userId,
    });
    if (!url) throw new UrlFailedToSave();
    return url;
  }

  public async cacheShortUrl({
    shortLink,
    originalLink,
  }: CacheShortUrlInternalDto) {
    const res = await this.redisClient.hSet(
      this.hashName,
      shortLink,
      originalLink,
    );
    if (!res) throw new UrlFailedToCache();
    if (res) return shortLink;
  }

  public async getUrlsForUser(userId: string) {
    const urls = await this.urlModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);
    return urls;
  }

  public async getOriginalUrlByShortUrl(shortUrl: string) {
    const originalLink = await this.redisClient.hGet(this.hashName, shortUrl);
    return originalLink;
  }
}
