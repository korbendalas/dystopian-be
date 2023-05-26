import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async me(id: number): Promise<Users> {
    const user = await this.prismaService.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('Not Found', 404);
    }
    return user;
  }
}
