import {
  Table,
  Column,
  Model,
  Unique,
  Default,
  DataType,
} from 'sequelize-typescript';
import { UserType } from '@api/modules/user/types';
// https://docs.nestjs.com/techniques/database#sequelize-integration

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column
  salt: string;

  @Default(UserType.BUYER)
  @Column
  user_type: UserType;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  // homes            Home[]
  // buyer_messages   Message[] @relation("buyer_messages")
  // realtor_messages Message[] @relation("realtor_messages")
}
