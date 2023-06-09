import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export interface UserDecoratorInterface {
  id: number;
  name: string;
  iat: number;
  exp: number;
}
export const UserDB = createParamDecorator(
  async (data, context: ExecutionContext) => {
    //context is Same thing as in interceptor

    const userId = context.switchToHttp().getRequest()?.user?.id;

    if (!userId) {
      throw new NotFoundException('User not found.');
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  },
);
