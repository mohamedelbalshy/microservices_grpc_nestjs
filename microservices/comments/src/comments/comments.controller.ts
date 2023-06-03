import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  GrpcMethod,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import {
  CreateCommentDto,
  FindManyCommentsDto,
  FindOrDeleteOneCommentDto,
  UpdateCommentDto,
} from './dto/comment.dto';

@Controller()
export class CommentsController {
  private readonly logger = new Logger(CommentsController.name);
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
  ) {}

  @MessagePattern('post_deleted')
  async handlePostDeleted(
    @Payload() data: { userId: string; postId: string },
    @Ctx() context: RmqContext,
  ) {
    const deleteResponse = await this.commentRepo.delete({
      postId: data.postId,
      userId: data.userId,
    });
    this.logger.log(`Comments deleted res: `, { deleteResponse });
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
  }

  @GrpcMethod('CommentsService', 'create')
  async create(createCommentDto: CreateCommentDto) {
    try {
      const comment = new CommentEntity();
      comment.content = createCommentDto.content;
      comment.postId = createCommentDto.postId;
      comment.userId = createCommentDto.userId;

      await this.commentRepo.save(comment);
      return { comment, success: true, errors: [] };
    } catch (error) {
      this.logger.error(error.msg || error.message);
      return { success: false, errors: [error.msg || error.message] };
    }
  }

  @GrpcMethod('CommentsService', 'findOne')
  async findOne(findOrDeleteOneCommentInput: FindOrDeleteOneCommentDto) {
    try {
      const { userId, id } = findOrDeleteOneCommentInput;
      const comment = await this.commentRepo.findOne({ where: { id, userId } });
      if (!comment) {
        return {
          errors: [`Comment with id: ${id} not found!`],
          success: false,
        };
      }
      return { comment, success: true, errors: [] };
    } catch (error) {
      this.logger.error(error.msg || error.message);
      return { success: false, errors: [error.msg || error.message] };
    }
  }

  @GrpcMethod('CommentsService', 'findMany')
  async findMany(findManyCommentsDto: FindManyCommentsDto) {
    try {
      const { postId } = findManyCommentsDto;
      const comments = await this.commentRepo.find({ where: { postId } });
      return { comments, success: true, errors: [] };
    } catch (error) {
      this.logger.error(error.msg || error.message);
      return { success: false, errors: [error.msg || error.message] };
    }
  }

  @GrpcMethod('CommentsService', 'updateById')
  async updateById(updateCommentDto: UpdateCommentDto) {
    try {
      const { id, userId, content } = updateCommentDto;

      const commentRes = await this.findOne({ id, userId });
      if (!commentRes.success) {
        return commentRes;
      }
      await this.commentRepo.update(id, { content });
      return { comment: commentRes.comment, success: true, errors: [] };
    } catch (error) {
      this.logger.error(error.msg || error.message);
      return { success: false, errors: [error.msg || error.message] };
    }
  }

  @GrpcMethod('CommentsService', 'deleteById')
  async deleteById(findOrDeleteOneCommentInput: FindOrDeleteOneCommentDto) {
    try {
      const { id, userId } = findOrDeleteOneCommentInput;

      const commentRes = await this.findOne({ id, userId });
      if (!commentRes.success) {
        return commentRes;
      }
      await this.commentRepo.delete(id);

      return { success: true, errors: [] };
    } catch (error) {
      this.logger.error(error.msg || error.message);
      return { success: false, errors: [error.msg || error.message] };
    }
  }
}
