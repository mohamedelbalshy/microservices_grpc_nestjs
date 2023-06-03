import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PostsModule, CommentsModule, FriendsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
