import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@api/modules/user/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class UserModule {}
