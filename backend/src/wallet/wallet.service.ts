import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ConnectWalletDto } from './dto/connect-wallet.dto';

@Injectable()
export class WalletService {
  constructor(private readonly dataservice: DatabaseService) {}

  /**
   * Connects a blockchain wallet to a user account.
   * 
   * @param connectWalletDto - The data transfer object containing user ID and wallet address.
   * @returns A confirmation object containing wallet ID and status message.
   * @throws NotFoundException - If the user is not found.
   * @throws BadGatewayException - If the wallet address is already connected or if the user already has a connected wallet.
   */
  async connectWallet(connectWalletDto: ConnectWalletDto) {
    const { userId, walletAddress } = connectWalletDto;

    // Check if the user exists
    const user = await this.dataservice.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the wallet address is already connected
    const existingWallet = await this.dataservice.wallet.findFirst({
      where: {
        address: walletAddress,
      },
    });
    if (existingWallet) {
      throw new BadGatewayException('Wallet address already connected');
    }

    // Check if the user already has a connected wallet
    const userWallet = await this.dataservice.wallet.findFirst({
      where: {
        userId: userId,
      },
    });
    if (userWallet) {
      throw new BadGatewayException('User already has a connected wallet');
    }

    // Connect the wallet
    const wallet = await this.dataservice.wallet.create({
      data: {
        userId: userId,
        address: walletAddress,
      },
    });

    return {
      walletId: wallet.id,
      status: 'Wallet connected successfully',
    };
  }
}
