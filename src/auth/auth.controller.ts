import { PassportLoginDto } from './dto/passport-login.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './magiclogin.strategy';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly strategy: MagicLoginStrategy,
  ) {}

  @Post('login')
  login(
    @Req() req,
    @Res() res,
    @Body(new ValidationPipe()) body: PassportLoginDto,
  ) {
    this.authService.validate(body.destination);
    return this.strategy.send(req, res);
  }

  @UseGuards(AuthGuard('magiclogin'))
  @Get('login/callback')
  callback(@Req() req) {
    return this.authService.generateTokens(req.user);
  }
}
