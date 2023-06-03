import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:50051`,
      package: 'comments',
      protoPath: join(__dirname, '../_proto/comments.proto'),
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq-svc:5672'],
      queue: 'posts_queue',
      queueOptions: {
        durable: false,
      },
      noAck: false,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
