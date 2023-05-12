import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../user/user.entity';
import { config } from './sequelize.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const environment = process.env.NODE_ENV;
        console.log('config', config, environment);

        return {
          ...config[environment],
          models: [User],
          autoLoadModels: true,
          logging: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
