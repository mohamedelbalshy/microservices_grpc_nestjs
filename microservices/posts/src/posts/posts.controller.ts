import {
  Controller,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy, GrpcMethod } from '@nestjs/microservices';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { DataSource, Repository } from 'typeorm';
import { FindOrDeleteOneDto } from './dto/find-or-delete-one.dto';
import { lastValueFrom } from 'rxjs';
import { PostDeletedMessage } from './dto/post-deleted-message.dto';

@Controller('posts')
export class PostsController {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
    @Inject('COMMENTS_SERVICE') private readonly client: ClientProxy,
    private dataSource: DataSource,
  ) {}

  @GrpcMethod('PostsService', 'create')
  async create(createPostDto: CreatePostDto) {
    const post = new PostEntity();
    post.userId = createPostDto.userId;
    post.text = createPostDto.text;
    post.url = createPostDto.url;
    post.title = createPostDto.title;

    await this.postRepo.save(post);

    return { post, errors: [], success: true };
  }

  @GrpcMethod('PostsService', 'findOne')
  async findOne({ userId, id }: FindOrDeleteOneDto) {
    const post = await this.postRepo.findOne({ where: { userId, id } });
    if (!post)
      return {
        errors: [`Post not found!`],
        success: false,
        post,
      };
    return { post, success: true, errors: [] };
  }

  @GrpcMethod('PostsService', 'findMany')
  async findMany({ userId }: { userId: string }) {
    const posts = await this.postRepo.find({ where: { userId } });
    return { posts, success: true, errors: [] };
  }

  @GrpcMethod('PostsService', 'deleteById')
  async deleteById({ userId, id }: { userId: string; id: string }) {
    const { success, errors } = await this.findOne({ userId, id });
    if (!success) {
      return { success, errors };
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.postRepo.delete({ id, userId });

      await lastValueFrom(
        this.client.emit<string, PostDeletedMessage>('post_deleted', {
          userId,
          postId: id,
        }),
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }

    return { success: true, errors: [] };
  }
}
