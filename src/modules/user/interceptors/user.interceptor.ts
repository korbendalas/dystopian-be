import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

/**
 * This interceptor will decode the token and add the user object to the request object
 */
export class UserInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // req
    const req = context.switchToHttp().getRequest();
    const token = req?.headers?.authorization?.split('Bearer ')[1];
    console.log('TOKEN', token);
    if (!token) return next.handle();
    const user = await jwt?.decode(token);
    req.user = user; // we define user on req object

    // res
    return next.handle();
  }
}
