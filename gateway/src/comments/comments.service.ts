import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CommentsServiceI } from './comment.interface';
import { PostsService } from 'src/posts/posts.service';
import { lastValueFrom } from 'rxjs';
import {
  CreateCommentDto,
  FindManyCommentsDto,
  UpdateCommentDto,
} from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENTS_PACKAGE') private readonly client: ClientGrpc,
    private readonly postsService: PostsService,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: string) {
    const postResponse = await lastValueFrom(
      this.postsService.findOne({
        id: createCommentDto.postId,
        userId,
      }),
    );
    if (!postResponse.success) return postResponse;
    return this.client
      .getService<CommentsServiceI>('CommentsService')
      .create({ ...createCommentDto, userId });
  }

  async findMany(postId: string) {
    return this.client
      .getService<CommentsServiceI>('CommentsService')
      .findMany({ postId });
  }

  async updateById(updateCommentDto: UpdateCommentDto, userId: string) {
    return this.client
      .getService<CommentsServiceI>('CommentsService')
      .updateById({ ...updateCommentDto, userId });
  }

  async deleteById(id: string, userId: string) {
    return this.client
      .getService<CommentsServiceI>('CommentsService')
      .deleteById({ id, userId });
  }

  async findOne(id: string, userId: string) {
    return this.client
      .getService<CommentsServiceI>('CommentsService')
      .findOne({ id, userId });
  }
}
