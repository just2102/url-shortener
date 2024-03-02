import { Module } from '@nestjs/common';
import { KeepAliveController } from './keep-alive.controller';

@Module({
  controllers: [KeepAliveController],
})
export class KeepAliveModule {}
