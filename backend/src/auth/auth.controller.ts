import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    description:
      'This endpoint registers a new user by accepting an email and password, creating a new user account, and returning a user ID and authentication token.',
    summary: 'Register a new user',
  })
  create(@Body() registerData: RegisterUserDto) {
    return this.authService.register(registerData);
  }

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
