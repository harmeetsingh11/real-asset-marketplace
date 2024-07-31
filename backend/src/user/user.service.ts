import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile.dto';
// import { UserLogoutDto } from './dto/user-logout.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private dataservice: DatabaseService) {}

  async getUserProfile(userProfileDto: UserProfileDto) {
    let { userId } = userProfileDto;

    // Validate that userId is provided and is a number
    if (!userId || isNaN(Number(userId))) {
      throw new BadRequestException('Invalid User ID');
    }

    // Convert userId to number if it's a string
    if (typeof userId === 'string') {
      userId = Number(userId);
    }

    const user = await this.dataservice.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      userId: user.id,
      email: user.email,
    };
  }
}
