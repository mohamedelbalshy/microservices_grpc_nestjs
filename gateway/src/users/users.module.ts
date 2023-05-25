import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'USERS_PACKAGE',
          useFactory: () => ({
            transport: Transport.GRPC,
            options: {
              url: `${process.env.USERS_SVC_URL}:${process.env.USERS_SVC_PORT}`,
              package: 'users',
              protoPath: join(__dirname, '/../../_proto/users.proto'),
            },
          }),
          imports: [ConfigModule],
        },
      ],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
