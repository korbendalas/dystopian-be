import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserDecoratorInterface {
  id: number;
  name: string;
  iat: number;
  exp: number;
}
export const User = createParamDecorator((data, context: ExecutionContext) => {
  //context is Same thing as in interceptor
  const req = context.switchToHttp().getRequest();
  return req.user;
});
