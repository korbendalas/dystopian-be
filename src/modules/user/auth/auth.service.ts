import { ConflictException, HttpException, Injectable } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service';
import { SignupDto } from '../dtos/signup.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SigninDto } from '../dtos/signin.dto';
import { UserType } from '@api/modules/user/types';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@api/modules/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async signup(
    { email, password, name, phone }: SignupDto,
    userType: UserType,
  ) {
    const user = await this.userModel.findOne({
      where: { email },
    });

    if (user) {
      throw new ConflictException();
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      email,
      password: hash,
      name,
      phone,
      user_type: 1,
    });

    const token = await this.generateToken({ name, id: newUser.id });
    return { token, user: { user_type: newUser.user_type } };
  }

  async signin({ email, password }: SigninDto) {
    const user = await this.userModel.findOne({
      where: { email },
    });

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
      expiresIn: '155 days',
    });
  }

  generateProductKey({
    email,
    userType,
  }: {
    email: string;
    userType: UserType;
  }) {
    const key = process.env.PRODUCT_KEY_SECRET;

    const string = `${email}-${userType}-${key}`;
    return bcrypt.hash(string, 10);
  }
}
