import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { CheckoutCartDto } from './dto/checkout-cart.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CartService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addToCart(createCartItemDto: CreateCartItemDto) {
    const { userId, assetId } = createCartItemDto;

    // Validate user existence
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate asset existence
    const asset = await this.databaseService.asset.findUnique({
      where: { id: assetId },
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    // Check if the cart exists for the user
    let cart = await this.databaseService.cart.findUnique({
      where: { userId },
    });

    // Create a new cart if none exists
    if (!cart) {
      cart = await this.databaseService.cart.create({
        data: {
          user: { connect: { id: userId } },
          totalPrice: 0.0,
        },
      });
    }

    // Add the asset to the cart
    await this.databaseService.cartItem.create({
      data: {
        cart: { connect: { id: cart.id } },
        asset: { connect: { id: assetId } },
      },
    });

    // Fetch all cart items and sum their prices
    const cartItems = await this.databaseService.cartItem.findMany({
      where: { cartId: cart.id },
      include: { asset: true },
    });

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.asset.price,
      0,
    );

    // Update the cart with the new total price
    await this.databaseService.cart.update({
      where: { id: cart.id },
      data: { totalPrice },
    });

    return { cartId: cart.id, status: 'Item added to cart' };
  }

  async viewCart(userId: number) {
    // Find the user's cart and include cart items with asset details
    const cart = await this.databaseService.cart.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: { asset: true },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Map cart items to the desired format
    const cartItems = cart.cartItems.map((item) => ({
      cartItemId: item.id,
      assetId: item.asset.id,
      assetName: item.asset.name,
      price: item.asset.price,
    }));

    return { cartItems, totalPrice: cart.totalPrice };
  }

  async checkoutCart(checkoutCartDto: CheckoutCartDto) {
    const { userId, cartId } = checkoutCartDto;

    // Validate cart existence
    const cart = await this.databaseService.cart.findUnique({
      where: { id: cartId },
      include: { user: true, cartItems: true },
    });

    if (!cart || cart.userId !== userId) {
      throw new NotFoundException('Cart not found or access denied');
    }

    // Create a transaction
    const transaction = await this.databaseService.transaction.create({
      data: {
        user: { connect: { id: userId } },
        cart: { connect: { id: cartId } },
        transactionId: `txn_${Date.now()}`,
        status: 'Completed',
      },
    });

    // Clear cart items and reset cart total price
    await this.databaseService.cartItem.deleteMany({
      where: { cartId },
    });

    await this.databaseService.cart.update({
      where: { id: cartId },
      data: { totalPrice: 0.0 },
    });

    return {
      transactionId: transaction.transactionId,
      status: 'Purchase completed',
    };
  }
}
