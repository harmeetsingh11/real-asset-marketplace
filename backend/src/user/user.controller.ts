// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserLogoutDto } from './dto/user-logout.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Body() userProfileDto: UserProfileDto) {
    return this.userService.getUserProfile(userProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logoutUser(@Body() userLogoutDto: UserLogoutDto, @Req() req: Request) {
    // Extract token from Authorization header if present
    const authHeader = req.headers['authorization'];
    let token: string | undefined;

    if (authHeader && typeof authHeader === 'string') {
      // Authorization header format: "Bearer <token>"
      token = authHeader.replace('Bearer ', '');
    } else if (userLogoutDto.token) {
      token = userLogoutDto.token;
      console.log(token);
    }

    if (!token) {
      return { status: 'error', message: 'Token is required' };
    }

    // Update the request body to include the token if it was provided in the header
    const updatedLogoutDto = { ...userLogoutDto, token };

    return this.userService.logoutUser(updatedLogoutDto);
  }
}
