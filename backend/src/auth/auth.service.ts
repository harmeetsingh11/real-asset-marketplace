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

@Injectable()
export class AuthService {
  constructor(
    private readonly dataservice: DatabaseService,
    private readonly jwtservice: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    const { email, password } = loginData;
    const user = await this.dataservice.user.findFirst({
      where: {
        email: email,
      },
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

  async register(registerData: RegisterUserDto) {
    const user = await this.dataservice.user.findFirst({
      where: {
        email: registerData.email,
      },
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
