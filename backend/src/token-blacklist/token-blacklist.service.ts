import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenBlacklistService {
  // In-memory store for blacklisted tokens
  private readonly blacklist: Set<string> = new Set();

  /**
   * Adds a token to the blacklist.
   * @param token - The token to be blacklisted.
   */
  async addTokenToBlacklist(token: string) {
    this.blacklist.add(token);
  }

  /**
   * Checks if a token is blacklisted.
   * @param token - The token to check.
   * @returns A promise that resolves to true if the token is blacklisted, otherwise false.
   */
  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.blacklist.has(token);
  }
}
