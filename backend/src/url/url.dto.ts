import { IsString } from 'class-validator';

export class UrlShortenDto {
  @IsString()
  url: string;
}

export class ShortenAndCacheUrlInternalDto {
  originalLink: string;
  userId: string;
}

export class SetShortUrlToCacheInternalDto {
  key: string;
  originalLink: string;
  shortUrl: string;
}

export class ShortenUrlResponseDto {
  shortUrl: string;
}

export class SaveUrlForUserInternalDto {
  originalLink: string;
  shortLink: string;
  userId: string;
}

export class CacheShortUrlInternalDto {
  shortLink: string;
  originalLink: string;
}
