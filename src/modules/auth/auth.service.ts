import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from '../user/dtos/signup.dto';
import * as bcrypt from 'bcryptjs';
import { Users, UserType } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { SigninDto } from '../user/dtos/signin.dto';
import { UserResponseDTO } from '../user/dtos/response.dto';

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
  async oauth(body: any): Promise<{ token: string; user: UserResponseDTO }> {
    const { email, firstName, lastName, googleId } = body;
    const user = await this.prismaService.users.findUnique({
      where: { googleId },
    });

    if (!user) {
      let isUsernameTaken = true;
      let generatedUsername = '';
      while (isUsernameTaken) {
        generatedUsername = await this.generateUsername(firstName, lastName);
        isUsernameTaken = await this.checkUsername(generatedUsername);
      }

      const newUser: Users = await this.prismaService.users.create({
        data: {
          firstName,
          lastName,
          email,
          googleId,
          username: generatedUsername,
        },
      });
      const token = await this.generateToken({
        username: newUser.username,
        id: newUser.id,
      });
      delete newUser.password;
      return { token, user: newUser };
    }

    const token = await this.generateToken({
      username: user.username,
      id: user.id,
    });
    delete user.password;
    return { token, user };
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

  // TODO implement Refresh token functionality
  async generateToken({ username, id }) {
    return jwt.sign({ username, id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
  async checkUsername(username: string): Promise<boolean> {
    const user = await this.prismaService.users.findUnique({
      where: { username },
    });
    return !!user;
  }

  async generateUsername(firstName: string, lastName: string): Promise<string> {
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${Math.floor(
      Math.random() * 10000,
    )}`;
  }
}
