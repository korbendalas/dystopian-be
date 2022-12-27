import { IsEmail, IsEnum } from 'class-validator';
import { UserType } from '@prisma/client';

export class GenerateProductKeyDto {
  @IsEmail()
  email: string;

  @IsEnum(UserType)
  userType: UserType;
}
