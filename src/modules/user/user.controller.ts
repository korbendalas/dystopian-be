import { Controller, Get } from '@nestjs/common';
import {
  UserDB,
  UserDecoratorInterface,
} from '../../common/decorators/param-decorators/user-db.decorator';
import { UserService } from '../user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async me(@UserDB() user: UserDecoratorInterface) {
    return this.userService.me(user.id);
  }
}
