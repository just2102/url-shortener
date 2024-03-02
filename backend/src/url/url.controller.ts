import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ShortenUrlResponseDto, UrlShortenDto } from './url.dto';
import { UrlService } from './url.service';
import { JwtAuthGuard } from 'src/auth/guard/jwtAuth.guard';
import { UserAuthContext } from 'src/user/user.types';
import { UserService } from 'src/user/user.service';

@Controller('/url')
@UseGuards(JwtAuthGuard)
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly userService: UserService,
  ) {}

  @Post('/shorten')
  async shorten(
    @Req() req: UserAuthContext,
    @Body() body: UrlShortenDto,
  ): Promise<ShortenUrlResponseDto> {
    const user = await this.userService.parseUserFromEmail(req.user.email);

    return await this.urlService.shortenAndCacheUrl({
      originalLink: body.url,
      userId: user._id,
    });
  }

  @Get('/getUrlsForUser')
  async getUrlsForUser(@Req() req: UserAuthContext) {
    const user = await this.userService.parseUserFromEmail(req.user.email);

    return await this.urlService.getUrlsForUser(user._id);
  }
}
