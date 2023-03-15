import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { MagicLoginStrategy } from './magiclogin.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'random',
      signOptions: {
        expiresIn: '2 days',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MagicLoginStrategy, JwtStategy],
})
export class AuthModule {}
