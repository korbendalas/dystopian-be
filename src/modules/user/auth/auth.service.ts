import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SignupDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async signup({ email, ...data }: SignupDto) {
    const user = await this.prismaService.user.count();

    if (user) {
      throw new ConflictException();
    }

    return data;
  }
}
