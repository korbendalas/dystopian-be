import { IsEmail, IsEnum } from 'class-validator';
import { UserType } from '../types';

export class GenerateProductKeyDto {
  @IsEmail()
  email: string;

  @IsEnum(UserType)
  userType: UserType;
}
