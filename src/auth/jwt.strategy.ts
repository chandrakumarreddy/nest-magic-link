import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'random',
      ignoreExpiration: false,
    });
  }
  validate(payload: User) {
    const { email } = payload;
    const user = this.authService.validate(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
