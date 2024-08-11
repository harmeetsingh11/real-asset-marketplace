import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT Authentication Guard.
 * This guard uses Passport.js to handle JWT authentication.
 */
export class JwtAuthGuard extends AuthGuard('jwt') {

  /**
   * Determines if the request is allowed to proceed.
   */
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  /**
   * Handles the request after authentication.
   */
  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
