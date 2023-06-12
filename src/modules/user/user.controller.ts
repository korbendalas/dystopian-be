import { Controller, Get } from '@nestjs/common';
import {
  UserDB,
  UserDecoratorInterface,
} from '../../common/decorators/param-decorators/user-db.decorator';
import { UserService } from '../user/user.service';
import { UserJwt } from '../../common/decorators/param-decorators/user-jwt.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async me(@UserJwt() user: UserDecoratorInterface) {
    return this.userService.me(user.id);
  }
}
