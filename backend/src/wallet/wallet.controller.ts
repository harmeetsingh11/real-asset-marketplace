import { Controller, Post, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ConnectWalletDto } from './dto/connect-wallet.dto';

@Controller('api/wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post('connect')
  async connectWallet(@Body() connectWalletDto: ConnectWalletDto) {
    return this.walletService.connectWallet(connectWalletDto);
  }
}
