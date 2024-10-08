// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserLogoutDto } from './dto/user-logout.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User') // Tag for Swagger documentation
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth() // Indicates that the endpoint requires a bearer token
  @UseGuards(JwtAuthGuard) // Protects the endpoint with JWT authentication
  @Post('profile')
  @ApiOperation({
    description:
      'This endpoint retrieves the profile information of a user by providing the user ID. It returns the user ID and email.',
    summary: 'Get user profile', // Brief description for Swagger
  })
  async getUserProfile(@Body() userProfileDto: UserProfileDto) {
    return this.userService.getUserProfile(userProfileDto);
  }

  @ApiBearerAuth() // Indicates that the endpoint requires a bearer token
  @UseGuards(JwtAuthGuard) // Protects the endpoint with JWT authentication
  @Post('logout')
  @ApiOperation({
    description:
      'This endpoint logs out a user by invalidating their authentication token. It requires the user ID and token, and returns the logout status.',
    summary: 'Logout user', // Brief description for Swagger
  })
  async logoutUser(@Body() userLogoutDto: UserLogoutDto, @Req() req: Request) {
    // Extract token from Authorization header if present
    const authHeader = req.headers['authorization'];
    let token: string | undefined;

    if (authHeader && typeof authHeader === 'string') {
      // Authorization header format: "Bearer <token>"
      token = authHeader.replace('Bearer ', '');
    } else if (userLogoutDto.token) {
      token = userLogoutDto.token;
    }

    if (!token) {
      return { status: 'error', message: 'Token is required' };
    }

    // Update the request body to include the token if it was provided in the header
    const updatedLogoutDto = { ...userLogoutDto, token };

    return this.userService.logoutUser(updatedLogoutDto);
  }
}
