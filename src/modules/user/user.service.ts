import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async me(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        UserAvatar: true,
      },
    });

    if (!user) {
      throw new HttpException('Not Found', 404);
    }
    console.log('user', user);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      telephone: user.telephone,
      email: user.email,
      address: user.address,
      city: user.city,
      country: user.country,
      zipCode: user.zipCode,
      userType: user.userType,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      avatar: user.UserAvatar ?? [],
    };
  }
}
