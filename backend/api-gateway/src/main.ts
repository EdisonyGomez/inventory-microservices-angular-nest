import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS Configuration
  app.enableCors({
    origin: 'https://peaceful-spontaneity-production.up.railway.app',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, 
      transformOptions: {
        enableImplicitConversion: true, 
      },
    }),
  );

  // Documentación Swagger
  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('Microservicio de gestión de productos')
    .setVersion('1.0')
    .addTag('products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // URL de la doc

  await app.listen(3000);
}
bootstrap();
