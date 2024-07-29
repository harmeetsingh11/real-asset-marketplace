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

  async connectWallet(connectWalletDto: ConnectWalletDto) {
    const { userId, walletAddress } = connectWalletDto;

    // Check if user exists
    const user = await this.dataservice.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if wallet address already exists
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
