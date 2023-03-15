import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { AuthService } from './auth.service';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(MagicLoginStrategy.name);
  constructor(private authService: AuthService) {
    super({
      secret: 'random',
      jwtOptions: {
        expiresIn: '2 days',
      },
      callbackUrl: 'http://localhost:3000/auth/login/callback',
      sendMagicLink: async (destination, href) => {
        this.logger.debug(`Sending email to ${destination} with link ${href}`);
      },
      verify: async (payload, callback) => {
        callback(null, this.validate(payload));
      },
    });
  }
  validate(payload: { destination: string }) {
    const user = this.authService.validate(payload.destination);
    return user;
  }
}
