import { IsInt, IsString } from 'class-validator';

export class ConnectWalletDto {
  @IsInt()
  userId: number;

  @IsString()
  walletAddress: string;
}
