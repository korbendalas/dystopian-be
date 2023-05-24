import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SignupDto } from '../dtos/signup.dto';
import * as bcrypt from 'bcryptjs';
import { Users, UserType } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { SigninDto } from '../dtos/signin.dto';
import { UserResponseDTO } from '../dtos/response.dto';
import process from 'process';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signup({
    firstName,
    lastName,
    email,
    password,
    username,
  }: SignupDto): Promise<{ token: string; user: UserResponseDTO }> {
    const user = await this.prismaService.users.findUnique({
      where: { email },
    });

    if (user) {
      throw new ConflictException();
    }

    const hash = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS),
    );

    const newUser: Users = await this.prismaService.users.create({
      data: {
        firstName,
        lastName,
        email,
        password: hash,
        username,
      },
    });
    delete newUser.password;
    const token = await this.generateToken({ username, id: newUser.id });
    return { token, user: { ...newUser } };
  }

  async signin({
    email,
    password,
  }: SigninDto): Promise<{ token: string; user: UserResponseDTO }> {
    const user = await this.prismaService.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException('Invalid Credentials', 400);
    }

    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException('Invalid Credentials', 400);
    }

    const token = await this.generateToken({
      username: user.username,
      id: user.id,
    });
    delete user.password;
    return { token, user };
  }

  async generateToken({ username, id }) {
    return jwt.sign({ username, id }, process.env.JWT_SECRET, {
      expiresIn: '5 days',
    });
  }
}
