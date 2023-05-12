import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export class UserInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // req
    const req = context.switchToHttp().getRequest();
    if (!req?.headers?.authorization) {
      return next.handle();
    }
    const token = req?.headers?.authorization?.split('Bearer ')[1];
    console.log('token', token);

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your_secret_key' with your actual secret key
      req.user = decodedToken;
    } catch (error) {
      // Handle token verification error
      console.error('Token verification error:', error.message);
    }

    // res
    return next.handle();
  }
}
