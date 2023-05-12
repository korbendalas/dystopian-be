import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { join } from 'path';

@Injectable()
export class MigrationService {
  private umzug: Umzug;

  constructor(private sequelize: Sequelize) {
    this.umzug = new Umzug({
      migrations: {
        path: ,  // join(__dirname, '..', 'migrations'),
        pattern: /\.ts$/, // Specify the file extension of your migration files
      },
      storage: new SequelizeStorage({ sequelize }),
      // logging: false, // Set to true to enable logging
    });
  }

  async runMigrations(): Promise<void> {
    await this.umzug.up();
    console.log('Migrations executed successfully.');
  }

  async revertMigrations(): Promise<void> {
    await this.umzug.down({ to: 0 });
    console.log('Migrations reverted successfully.');
  }
}
