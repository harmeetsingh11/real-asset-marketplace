import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

/**
 * AuthService
 * 
 * Handles authentication operations such as login and registration of users.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly dataservice: DatabaseService,
    private readonly jwtservice: JwtService,
  ) {}

  /**
   * Authenticates a user based on login data and issues a JWT token.
   * 
   * @param loginData - Contains email and password for login.
   * @returns An object containing the user ID and JWT token.
   * @throws NotFoundException - If the user is not found or the password is incorrect.
   */
  async login(loginData: LoginDto) {
    const { email, password } = loginData;
    const user = await this.dataservice.user.findFirst({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException('No user exists with the entered email');
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      throw new NotFoundException('Wrong Password');
    }
    const token = this.jwtservice.sign({ id: user.id, email: user.email });
    return {
      userId: user.id,
      token,
    };
  }

  /**
   * Registers a new user by creating an entry in the database and issuing a JWT token.
   * 
   * @param registerData - Contains user details for registration.
   * @returns An object containing the new user ID and JWT token.
   * @throws BadGatewayException - If a user with the provided email already exists.
   */
  async register(registerData: RegisterUserDto) {
    const user = await this.dataservice.user.findFirst({
      where: { email: registerData.email },
    });
    if (user) {
      throw new BadGatewayException('User with this email already exists');
    }
    registerData.password = await bcrypt.hash(registerData.password, 10);
    const newUser = await this.dataservice.user.create({ data: registerData });
    const token = this.jwtservice.sign({
      id: newUser.id,
      email: newUser.email,
    });
    return {
      userId: newUser.id,
      token,
    };
  }
}
