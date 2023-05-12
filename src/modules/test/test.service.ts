import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@api/modules/user/user.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private sequelize: Sequelize,
  ) {}
  create(createTestDto: CreateTestDto) {
    return 'This action adds a new test';
  }

  async findAll() {
    const sequelize = await this.sequelize.query('SELECT * FROM users');
    console.log('sequelize', sequelize);
    const result = await this.userModel.findOne({ where: { id: 1 } });
    console.log('result', result);
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
