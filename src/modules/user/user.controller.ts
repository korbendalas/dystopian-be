import { Controller, Get } from '@nestjs/common';
import {
  User,
  UserDecoratorInterface,
} from '../user/decorators/user.decorator';
import { UserService } from '../user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async me(@User() user: UserDecoratorInterface) {
    return this.userService.me(user.id);
  }
}
