import { Injectable } from '@nestjs/common';
import {
  ShortenAndCacheUrlInternalDto,
  ShortenUrlResponseDto,
} from './url.dto';
import { nanoid } from 'nanoid';
import { UrlDbService } from './url.db';

@Injectable()
export class UrlService {
  private readonly UUID_LENGTH = 6;
  private readonly BASE_URL = process.env.BASE_URL;
  constructor(private readonly urlDbService: UrlDbService) {}

  public async shortenAndCacheUrl({
    originalLink,
    userId,
  }: ShortenAndCacheUrlInternalDto): Promise<ShortenUrlResponseDto> {
    const shortLink = nanoid(this.UUID_LENGTH);
    await Promise.all([
      this.urlDbService.saveUrlForUser({
        originalLink,
        shortLink,
        userId,
      }),
      this.urlDbService.cacheShortUrl({
        shortLink,
        originalLink,
      }),
    ]);

    return {
      shortUrl: `${this.BASE_URL}/${shortLink}`,
    };
  }

  public async getOriginalUrlByShortUrl(shortUrl: string) {
    const originalLink =
      await this.urlDbService.getOriginalUrlByShortUrl(shortUrl);
    return originalLink;
  }

  public async getUrlsForUser(userId: string) {
    const urls = await this.urlDbService.getUrlsForUser(userId);
    return urls;
  }
}
