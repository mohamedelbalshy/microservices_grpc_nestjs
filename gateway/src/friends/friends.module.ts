import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { UsersModule } from 'src/users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'FRIENDS_PACKAGE',
          useFactory: () => ({
            transport: Transport.GRPC,
            options: {
              url: `${process.env.FRIENDS_SVC_URL}:${process.env.FRIENDS_SVC_PORT}`,
              package: 'friends',
              protoPath: join(__dirname, '/../../_proto/friends.proto'),
            },
          }),
          imports: [ConfigModule],
        },
      ],
    }),
    UsersModule,
  ],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
