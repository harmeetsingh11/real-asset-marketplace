import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  walletEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  walletPassword: string;

  @ApiProperty()
  @IsString()
  paymailId: string;

  @ApiProperty()
  @IsString()
  address: string;
}
