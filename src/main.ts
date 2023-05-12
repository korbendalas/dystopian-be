import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MigrationService } from '@database/migration.service';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const migrationService = app.get(MigrationService);

  // Run migrations
  await migrationService.runMigrations();
  const port = process.env.PORT || 4000;
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.listen(port);
}
bootstrap();
