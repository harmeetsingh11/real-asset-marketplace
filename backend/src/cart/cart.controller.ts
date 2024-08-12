import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { CheckoutCartDto } from './dto/checkout-cart.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * Controller for managing cart operations.
 */
@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * Endpoint to add an asset to the user's cart.
   * @param createCartItemDto - DTO containing user ID and asset ID to be added to the cart.
   * @returns Status of the addition and the cart ID.
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('add')
  @ApiOperation({
    description:
      'This endpoint allows a user to add an asset to their cart by providing the user ID and asset ID. It returns the cart ID and addition status.',
    summary: 'Add asset to cart',
  })
  async addToCart(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartService.addToCart(createCartItemDto);
  }

  /**
   * Endpoint to view items in the user's cart.
   * @param userId - User ID whose cart items are to be viewed.
   * @returns List of cart items and the total price of the cart.
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('view')
  @ApiOperation({
    description:
      'This endpoint allows a user to view items in their cart by providing the user ID. It returns a list of cart items and the total price.',
    summary: 'View cart items',
  })
  async viewCart(@Query('userId') userId: number) {
    return this.cartService.viewCart(userId);
  }

  /**
   * Endpoint to checkout and purchase the items in the user's cart.
   * @param checkoutCartDto - DTO containing user ID and cart ID for the checkout.
   * @returns Transaction ID and checkout status.
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  @ApiOperation({
    description:
      'This endpoint allows a user to checkout and purchase the items in their cart by providing the user ID and cart ID. It returns the transaction ID and checkout status.',
    summary: 'Checkout and purchase',
  })
  async checkoutCart(@Body() checkoutCartDto: CheckoutCartDto) {
    return this.cartService.checkoutCart(checkoutCartDto);
  }
}
