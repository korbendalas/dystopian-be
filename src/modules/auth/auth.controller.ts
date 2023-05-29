import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from '../user/dtos/signup.dto';
import { SigninDto } from '../user/dtos/signin.dto';
import { GoogleOauthGuard } from './strategies/google/google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Post('/signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }

  @UseGuards(GoogleOauthGuard)
  @Get('google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth(@Req() req) {}

  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  async googleAuthCallback(@Req() req, @Res() res) {
    if (!req.user) {
      return res.redirect(req.headers.origin);
    }

    const user = await this.authService.oauth(req.user);
    console.log('req.headers.origin', req.headers.origin); // test
    return res.redirect(
      `${req.headers.origin}/oauth-redirect?token=${user.token}`,
    );
  }
}
