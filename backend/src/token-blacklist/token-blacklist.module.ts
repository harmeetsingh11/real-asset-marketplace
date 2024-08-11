import { Module } from '@nestjs/common';
import { TokenBlacklistService } from './token-blacklist.service';

/**
 * Module for handling token blacklist functionality.
 * Provides and exports the TokenBlacklistService.
 */
@Module({
  providers: [TokenBlacklistService],
  exports: [TokenBlacklistService],
})
export class TokenBlacklistModule {}
