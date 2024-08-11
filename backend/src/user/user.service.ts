import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile.dto';
import { DatabaseService } from 'src/database/database.service';
import { UserLogoutDto } from './dto/user-logout.dto';
import { TokenBlacklistService } from 'src/token-blacklist/token-blacklist.service';

@Injectable()
export class UserService {
  constructor(
    private dataservice: DatabaseService,
    private tokenBlacklistService: TokenBlacklistService,
  ) {}

  /**
   * Retrieves user profile information.
   * @param userProfileDto - DTO containing the user ID.
   * @returns The user's ID and email.
   * @throws BadRequestException if the user ID is invalid.
   * @throws NotFoundException if the user is not found.
   */
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

  /**
   * Logs out a user by invalidating their token.
   * @param userLogoutDto - DTO containing the user ID and token.
   * @returns A success status message.
   * @throws NotFoundException if the user is not found.
   */
  async logoutUser(userLogoutDto: UserLogoutDto) {
    const { userId, token } = userLogoutDto;

    // Validate user existence
    const user = await this.dataservice.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Invalidate the token
    await this.tokenBlacklistService.addTokenToBlacklist(token);

    return { status: 'User logged out successfully' };
  }
}
