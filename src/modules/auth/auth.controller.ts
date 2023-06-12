import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from '../user/dtos/signup.dto';
import { SigninDto } from '../user/dtos/signin.dto';
import { GoogleOauthGuard } from './strategies/google/google-oauth.guard';
import { ConfigService } from '@nestjs/config';
import { IDomain } from '../../config/config.interface';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AtGuard } from '../../common/guards/at.guard';
import { RtGuard } from '../../common/guards/rt.guard';
import { UserJwt } from '../../common/decorators/param-decorators/user-jwt.decorator';
import { Public } from '../../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  private readonly frontendUrl: IDomain;
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    this.frontendUrl = this.configService.get<IDomain>('domain');
  }

  @Public()
  @Post('/signup')
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }
  @Public()
  @Post('/signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }
  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  refresh(@UserJwt() user) {
    return this.authService.refreshTokens(
      parseInt(user.id, 10),
      user.refreshToken,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  logout(@UserJwt('id') id: number) {
    this.authService.logout(id);
  }

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth(@Req() req) {}

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  async googleAuthCallback(@Req() req, @Res() res) {
    const REDIRECT_FE_URL = this.frontendUrl.frontend;
    console.log('REDIRECT_FE_URL', REDIRECT_FE_URL);
    if (!req.user) {
      return res.redirect(REDIRECT_FE_URL);
    }

    const user = await this.authService.oauth(req.user);
    return res.redirect(
      `${REDIRECT_FE_URL}/oauth-redirect?token=${user.token}&refreshToken=${user.refreshToken}`,
    );
  }
}
