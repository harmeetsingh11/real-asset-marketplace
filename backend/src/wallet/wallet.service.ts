import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { DatabaseService } from 'src/database/database.service';
import { WalletByUserDto } from './dto/get-wallet.dto';

@Injectable()
export class WalletService {
  constructor(private readonly dataservice: DatabaseService) {}
  async createWallet(createWalletDto: CreateWalletDto) {
    const { walletEmail, walletPassword, paymailId, address, userId } =
      createWalletDto;

    try {
      // Check if a wallet already exists for the given userId
      const existingWallet = await this.dataservice.wallet.findUnique({
        where: { userId },
      });

      if (existingWallet) {
        throw new HttpException(
          'A wallet is already associated with this user.',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Create a new wallet record
      const wallet = await this.dataservice.wallet.create({
        data: {
          walletEmail,
          walletPassword,
          paymailId,
          address,
          userId,
        },
      });

      return wallet;
    } catch (error) {
      // Detailed error handling
      if (error instanceof NotFoundException) {
        throw error; // Rethrow known errors
      }

      if (error.code === 'P2002') {
        throw new ConflictException(
          'Wallet address or paymail ID already exists',
        );
      }

      console.error('Detailed Error:', error);
      throw new Error('Failed to create wallet. Please try again.');
    }
  }

  // Method to get all wallets by userId
  async getWalletsByUser(walletByUserDto: WalletByUserDto) {
    let { userId } = walletByUserDto;

    // Convert UserId to number if it's a string
    if (typeof userId === 'string') {
      userId = parseInt(userId, 10);
    }

    try {
      const wallets = await this.dataservice.wallet.findMany({
        where: { userId },
      });

      if (wallets.length === 0) {
        throw new NotFoundException('No wallet found, please create a wallet.');
      }

      return wallets.map((wallet) => ({
        walletId: wallet.id,
        walletEmail: wallet.walletEmail,
        walletPassword: wallet.walletPassword,
        paymailId: wallet.paymailId,
        address: wallet.address,
      }));
    } catch (error) {
      // Detailed error handling
      if (error instanceof NotFoundException) {
        throw error; // Rethrow known errors
      }
      throw new NotFoundException(`Failed to get wallets: ${error.message}`);
    }
  }
}
