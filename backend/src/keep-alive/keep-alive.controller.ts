import { Controller, Get } from '@nestjs/common';

@Controller('keep-alive')
export class KeepAliveController {
  @Get()
  keepAlive() {
    return {
      alive: true,
    };
  }
}
