import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLogoutDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: number;

  @ApiProperty()
  @IsString()
  token?: string;
}
