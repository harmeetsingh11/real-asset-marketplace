import { Injectable } from '@nestjs/common';

/**
 * Service for handling application logic.
 */
@Injectable()
export class AppService {
  /**
   * Returns a simple greeting message.
   * @returns {string} Greeting message
   */
  getHello(): string {
    return 'Hello World!';
  }
}