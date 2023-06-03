import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:50051`,
      package: 'posts',
      protoPath: join(__dirname, '../_proto/posts.proto'),
    },
  });

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://rabbitmq-svc:5672'],
  //     queue: 'posts_queue',
  //     queueOptions: {
  //       durable: false,
  //     },

  //   },
  // });
  await app.startAllMicroservices();
  return await app.listen(3001);
}
bootstrap();
