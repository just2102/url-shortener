import { Controller, Get, Param, Res } from '@nestjs/common';
import { UrlService } from 'src/url/url.service';
import { Response } from 'express';

@Controller()
export class RedirectController {
  constructor(private readonly urlService: UrlService) {}

  @Get('/:shortUrl')
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    if (!shortUrl) return;

    const originalUrl =
      await this.urlService.getOriginalUrlByShortUrl(shortUrl);
    if (!originalUrl) {
      return { url: `${process.env.FRONTEND_URL}` };
    }
    res.redirect(originalUrl);
  }
}
