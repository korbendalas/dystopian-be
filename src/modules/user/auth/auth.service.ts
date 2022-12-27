import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SignupDto } from '../dtos/signup.dto';
import * as bcrypt from 'bcryptjs';
import { UserType } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';
import { SigninDto } from '../dtos/signin.dto';
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

    const token = await this.generateToken({ name, id: newUser.id });
    return { token };
  }

  async signin({ email, password }: SigninDto) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new HttpException('Invalid Credentials 1', 400);
    }

    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException('Invalid Credentials 2', 400);
    }

    const token = await this.generateToken({ name: user.name, id: user.id });
    return { token };
  }

  async generateToken({ name, id }) {
    return jwt.sign({ name, id }, process.env.JWT_SECRET, {
      expiresIn: '5 days',
    });
  }
}
