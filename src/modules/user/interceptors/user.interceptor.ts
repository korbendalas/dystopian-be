import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export class UserInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // req
    const req = context.switchToHttp().getRequest();
    const token = req?.headers?.authorization?.split('Bearer ')[1];

    const user = await jwt.decode(token);
    req.user = user; // we define user on req object

    // res
    return next.handle();
  }
}
