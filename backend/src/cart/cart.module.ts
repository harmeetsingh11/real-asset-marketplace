import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from 'src/database/database.module';

/**
 * Module for handling cart-related functionalities.
 * 
 * Imports:
 * - DatabaseModule: Provides access to the database.
 * 
 * Controllers:
 * - CartController: Handles HTTP requests related to the cart.
 * 
 * Providers:
 * - CartService: Contains the business logic for cart operations.
 */
@Module({
  imports: [DatabaseModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
