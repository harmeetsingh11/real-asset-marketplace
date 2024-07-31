import { Module } from '@nestjs/common';
import { TokenBlacklistService } from './token-blacklist.service';

@Module({
  exports: [TokenBlacklistService],
  providers: [TokenBlacklistService],
})
export class TokenBlacklistModule {}
