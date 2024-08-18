import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { DatabaseService } from 'src/database/database.service';

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
}
