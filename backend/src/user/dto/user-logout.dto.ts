import { IsNotEmpty, IsString } from 'class-validator';

export class UserLogoutDto {
  @IsNotEmpty()
  @IsString()
  userId: number;

  @IsString()
  token?: string; // Optional if provided in the body
}
