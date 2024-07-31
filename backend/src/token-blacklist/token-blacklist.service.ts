import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenBlacklistService {
  private readonly blacklist: Set<string> = new Set();

  // Add token to the blacklist
  async addTokenToBlacklist(token: string) {
    this.blacklist.add(token);
  }

  // Check if the token is blacklisted
  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.blacklist.has(token);
  }
}
