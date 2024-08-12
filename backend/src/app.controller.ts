import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Controller for handling HTTP requests to the root path.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Handles GET requests to the root path.
   * @returns {string} A greeting message
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
