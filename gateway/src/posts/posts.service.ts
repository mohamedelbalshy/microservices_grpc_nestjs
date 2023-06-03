import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { PostsServiceI } from './interfaces/post.interface';
import { FindOrDeleteOneDto } from './dto/find-or-delete-one.dto';

@Injectable()
export class PostsService {
  constructor(@Inject('POSTS_PACKAGE') private readonly client: ClientGrpc) {}
  create(createPostDto: CreatePostDto, userId: string) {
    return this.client
      .getService<PostsServiceI>('PostsService')
      .create({ ...createPostDto, userId });
  }

  findAll(userId: string) {
    return this.client
      .getService<PostsServiceI>('PostsService')
      .findMany({ userId });
  }

  findOne(FindOrDeleteOneDto: FindOrDeleteOneDto) {
    return this.client
      .getService<PostsServiceI>('PostsService')
      .findOne(FindOrDeleteOneDto);
  }

  update(id: string, updatePostDto: UpdatePostDto, userId: string) {
    return this.client
      .getService<PostsServiceI>('PostsService')
      .updateById({ ...updatePostDto, id, userId });
  }

  remove(id: string, userId: string) {
    return this.client
      .getService<PostsServiceI>('PostsService')
      .deleteById({ userId, id });
  }
}
