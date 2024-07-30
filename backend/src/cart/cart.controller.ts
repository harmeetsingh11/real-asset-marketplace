import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { CheckoutCartDto } from './dto/checkout-cart.dto';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartService.addToCart(createCartItemDto);
  }

  @Get('view')
  async viewCart(@Query('userId') userId: number) {
    return this.cartService.viewCart(userId);
  }

  @Post('checkout')
  async checkoutCart(@Body() checkoutCartDto: CheckoutCartDto) {
    return this.cartService.checkoutCart(checkoutCartDto);
  }
}
