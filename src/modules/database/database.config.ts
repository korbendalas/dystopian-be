import { Dialect } from 'sequelize';
import { ConfigService } from '@nestjs/config';
import { User } from '@api/modules/user/user.entity';

const dialect: Dialect = 'postgres'; // Specify the dialect explicitly

const databaseConfig = (configService: ConfigService) => ({
  development: {
    username: configService.get<string>('db.username'),
    password: configService.get<string>('db.password'),
    database:
      process.env.NODE_ENV === 'production'
        ? configService.get<string>('db.dbProduction')
        : configService.get<string>('db.dbDevelopment'),
    host: configService.get<string>('db.host'),
    port: Number(configService.get<number>('db.port')),
    dialect: 'postgres',
    models: [User], // [__dirname + '/**/*.entity{.ts,.js}'],
    autoloadModels: true,
    logging: true, // Set to true if you want to see SQL logs during migrations
  },
});

export { databaseConfig };
module.exports.databaseConfig = databaseConfig;
