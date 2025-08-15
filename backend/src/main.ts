import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Pantohealth API')
    .setDescription('API for IoT Data Management System with RabbitMQ Integration')
    .setVersion('1.0')
    .addTag('signals')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.SERVER_PORT || 3000);
  console.log('Application is running on: http://localhost:3000');
  console.log('Swagger UI is available at: http://localhost:3000/api');
}
bootstrap();