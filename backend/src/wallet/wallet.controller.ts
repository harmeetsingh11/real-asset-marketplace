import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ConnectWalletDto } from './dto/connect-wallet.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('api/wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Post('connect')
  async connectWallet(@Body() connectWalletDto: ConnectWalletDto) {
    return this.walletService.connectWallet(connectWalletDto);
  }
}
