import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { CheckoutCartDto } from './dto/checkout-cart.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addToCart(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartService.addToCart(createCartItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('view')
  async viewCart(@Query('userId') userId: number) {
    return this.cartService.viewCart(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async checkoutCart(@Body() checkoutCartDto: CheckoutCartDto) {
    return this.cartService.checkoutCart(checkoutCartDto);
  }
}
