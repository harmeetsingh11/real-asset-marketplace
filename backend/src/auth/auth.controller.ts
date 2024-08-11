import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * AuthController
 * 
 * Handles user authentication and registration endpoints.
 */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user.
   * 
   * Accepts registration details (email and password), creates a new user account, 
   * and returns a user ID along with an authentication token.
   * 
   * @param registerData - The registration data containing email and password.
   * @returns User ID and authentication token.
   */
  @Post('register')
  @ApiOperation({
    description:
      'This endpoint registers a new user by accepting an email and password, creating a new user account, and returning a user ID and authentication token.',
    summary: 'Register a new user',
  })
  create(@Body() registerData: RegisterUserDto) {
    return this.authService.register(registerData);
  }

  /**
   * Authenticates a user.
   * 
   * Verifies the user's email and password, and returns a user ID along with an authentication token 
   * if authentication is successful.
   * 
   * @param loginData - The login data containing email and password.
   * @returns User ID and authentication token.
   */
  @Post('login')
  @ApiOperation({
    description:
      'This endpoint authenticates a user by verifying their email and password, and returns a user ID and authentication token upon successful authentication.',
    summary: 'Authenticate user',
  })
  login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }
}
