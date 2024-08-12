import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ConnectWalletDto } from './dto/connect-wallet.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('connect')
  @ApiOperation({
    description: "Connects a user's blockchain wallet to their account by accepting the user's ID and wallet address, and returns a wallet ID and connection status.",
    summary: 'Connect a blockchain wallet',
  })
  async connectWallet(@Body() connectWalletDto: ConnectWalletDto) {
    return this.walletService.connectWallet(connectWalletDto);
  }
}
