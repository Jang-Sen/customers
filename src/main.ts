import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  app.enableCors();

  const RABBITMQ_URL = configService.get('RABBITMQ_URL');

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'customer_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await microservice.listen();

  await app.listen(3000);
}

bootstrap();
