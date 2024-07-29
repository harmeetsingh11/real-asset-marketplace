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
    description: 'To register a new user with email.',
    summary: 'Register a new User with details',
  })
  create(@Body() registerData: RegisterUserDto) {
    return this.authService.register(registerData);
  }

  @Post('login')
  @ApiOperation({
    description: 'Login using Email',
    summary: 'Endpoint to Login with User Email and Password',
  })
  login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }
}
