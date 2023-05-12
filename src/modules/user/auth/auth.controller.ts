import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from '../dtos/signup.dto';
import { SigninDto } from '../dtos/signin.dto';
import { GenerateProductKeyDto } from '../dtos/generateProductKey.dto';
import * as bcrypt from 'bcryptjs';
import {
  CurrentUser,
  UserDecoratorInterface,
} from '../decorators/user.decorator';
import { UserType } from '@api/modules/user/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  async test() {
    return 'test';
  }
  @Post('/signup/:userType')
  async signup(
    @Body() body: SignupDto,
    @Param('userType', new ParseEnumPipe(UserType)) userType: UserType,
  ) {
    if (userType !== UserType.BUYER) {
      if (!body.productKey) {
        throw new UnauthorizedException();
      }

      const key = process.env.PRODUCT_KEY_SECRET;

      const validProductKey = `${body.email}-${userType}-${key}`;
      console.log('validProductKey', validProductKey);
      const isValidProductKey = await bcrypt.compare(
        validProductKey,
        body.productKey,
      );

      if (!isValidProductKey) {
        throw new UnauthorizedException();
      }
    }
    console.log('body', body, userType);
    return this.authService.signup(body, userType);
  }

  @Post('/signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }

  @Post('/key')
  generateProductKey(@Body() { userType, email }: GenerateProductKeyDto) {
    return this.authService.generateProductKey({ userType, email });
  }

  @Get('/me')
  async me(@CurrentUser() user: UserDecoratorInterface) {
    return user;
  }
}
