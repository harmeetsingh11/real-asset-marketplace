import { PartialType } from '@nestjs/mapped-types';
import { ConnectWalletDto } from './connect-wallet.dto';

export class UpdateWalletDto extends PartialType(ConnectWalletDto) {}
