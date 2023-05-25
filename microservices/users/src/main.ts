import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:50051`,
        package: 'users',
        protoPath: join(__dirname, '../_proto/users.proto'),
      },
    },
  );
  return await app.listen();
}
bootstrap();
