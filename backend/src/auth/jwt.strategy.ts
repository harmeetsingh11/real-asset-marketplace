import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { DatabaseService } from 'src/database/database.service';

/**
 * JwtStrategy
 * 
 * Implements JWT-based authentication strategy using Passport.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly databaseService: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * Validates the JWT payload and checks if the user exists in the database.
   * 
   * @param payload - Contains the user ID and email from the JWT token.
   * @returns The user object if found; otherwise, throws an error.
   */
  async validate(payload: { id: number; email: string }) {
    const user = await this.databaseService.user.findUnique({
      where: { id: payload.id },
    });
    return user;
  }
}
