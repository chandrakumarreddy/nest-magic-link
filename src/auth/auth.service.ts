import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userSerive: UserService,
    private jwtService: JwtService,
  ) {}

  validate(email: string) {
    const user = this.userSerive.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();
    return user;
  }

  generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
