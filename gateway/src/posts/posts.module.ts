import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'POSTS_PACKAGE',
          useFactory: () => ({
            transport: Transport.GRPC,
            options: {
              url: `${process.env.POSTS_SVC_URL}:${process.env.POSTS_SVC_PORT}`,
              package: 'posts',
              protoPath: join(__dirname, '/../../_proto/posts.proto'),
            },
          }),
          imports: [ConfigModule],
        },
      ],
    }),
    UsersModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
