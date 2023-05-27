import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { PostsServiceI } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  constructor(@Inject('POSTS_PACKAGE') private readonly client: ClientGrpc) {}
  create(createPostDto: CreatePostDto, userId: string) {
    return this.client
      .getService<PostsServiceI>('PostsService')
      .create({ ...createPostDto, userId });
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
