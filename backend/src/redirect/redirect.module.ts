import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { UrlModule } from 'src/url/url.module';

@Module({
  imports: [UrlModule],
  controllers: [RedirectController],
})
export class RedirectModule {}
