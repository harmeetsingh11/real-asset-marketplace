import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
  Get,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
// import { ConnectWalletDto } from './dto/connect-wallet.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletByUserDto } from './dto/get-wallet.dto';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Post('connect')
  // @ApiOperation({
  //   description: "Connects a user's blockchain wallet to their account by accepting the user's ID and wallet address, and returns a wallet ID and connection status.",
  //   summary: 'Connect a blockchain wallet',
  // })
  // async connectWallet(@Body() connectWalletDto: ConnectWalletDto) {
  //   return this.walletService.connectWallet(connectWalletDto);
  // }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({
    description:
      "Creates a user's neucron blockchain wallet by accepting the wallet email and password, and returns a wallet address and paymail ID.",
    summary: 'Create a neucron blockchain wallet',
  })
  async create(@Body() createWalletDto: CreateWalletDto) {
    try {
      const wallet = await this.walletService.createWallet(createWalletDto);
      return {
        status: 'success',
        message: 'Wallet created successfully.',
        data: wallet,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // New endpoint to get wallet details by userId
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('get')
  @ApiOperation({
    description:
      'This endpoint retrieves wallet details associated with a specific user.',
    summary: 'Get wallet details by user ID',
  })
  async getWalletByUser(@Query() walletByUserDto: WalletByUserDto) {
    try {
      return await this.walletService.getWalletsByUser(walletByUserDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: error.message };
      }
      throw error;
    }
  }
}
