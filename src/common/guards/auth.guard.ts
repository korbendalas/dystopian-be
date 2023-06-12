import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

interface JWTPayload {
  id: number;
  name: string;
  iat: number;
  exp: number;
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //1 Determine the UserType
    // 2 Grab JWT from req headers and verify it
    // 3 DB request to get user by id
    // 4 is user can have permisions

    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roles?.length) {
      const req = context.switchToHttp().getRequest();

      const token = req?.headers?.authorization.split('Bearer ')[1];

      console.log('REQ', req?.user);

      try {
        const decode = (await jwt.verify(
          token,
          process.env.JWT_SECRET,
        )) as JWTPayload;

        const user = await this.prismaService.user.findUnique({
          where: { id: decode.id },
        });
        if (!user) return false;
        return !!roles.includes(user.userType);
      } catch (err) {
        return false;
      }
    }

    return true;
  }
}
