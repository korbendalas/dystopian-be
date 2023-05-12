import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@api/modules/user/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
