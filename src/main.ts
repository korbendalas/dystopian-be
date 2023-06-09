import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AtGuard } from './common/guards/at.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api/v1');

  const port = process.env.PORT || 4000;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  //SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Realtor API')
    .setDescription('Realtor API description')
    .setVersion('1.0')
    .addTag('Realtor V1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('openapi.json', JSON.stringify(document, null, 2));

  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
}
bootstrap();
