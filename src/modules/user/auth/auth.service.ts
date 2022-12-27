import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SignupDto } from '../dtos/auth.dto';
import * as bcrypt from 'bcryptjs';
import { UserType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async signup({ email, password, name, telephone }: SignupDto) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (user) {
      throw new ConflictException();
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await this.prismaService.user.create({
      data: {
        email,
        password: hash,
        name,
        telephone,
        user_type: UserType.BUYER,
      },
    });

    return newUser;
  }
}
