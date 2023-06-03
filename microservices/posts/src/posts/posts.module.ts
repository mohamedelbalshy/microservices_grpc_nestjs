import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register({
      clients: [
        {
          name: 'COMMENTS_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://rabbitmq-svc:5672'],
            queue: 'posts_queue',
            queueOptions: {
              durable: false,
            },


            
            noAck: false,
          },
        },
      ],
    }),
    TypeOrmModule.forFeature([PostEntity]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
