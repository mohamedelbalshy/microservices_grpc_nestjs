import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'COMMENTS_PACKAGE',
          useFactory: () => ({
            transport: Transport.GRPC,
            options: {
              url: `${process.env.COMMENTS_SVC_URL}:${process.env.COMMENTS_SVC_PORT}`,
              package: 'comments',
              protoPath: join(__dirname, '/../../_proto/comments.proto'),
            },
          }),
          imports: [ConfigModule],
        },
      ],
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
