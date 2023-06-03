import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { User } from 'src/users/decorators/user.decorator';
import { JWTPayload } from 'src/users/interfaces/users.interface';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

@ApiTags('Comment')
@Controller('comments')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @User() { userId }: JWTPayload,
  ) {
    return this.commentsService.create(createCommentDto, userId);
  }

  @Get('')
  findMany(@Query('postId') postId: string) {
    return this.commentsService.findMany(postId);
  }

  @Get(':id')
  findOne(@User() { userId }: JWTPayload, @Param('id') id: string) {
    return this.commentsService.findOne(id, userId);
  }

  @Put(':id')
  updateById(
    @Body() updateCommentDto: UpdateCommentDto,
    @User() { userId }: JWTPayload,
    @Param('id') id: string,
  ) {
    return this.commentsService.updateById({ ...updateCommentDto, id }, userId);
  }

  @Delete(':id')
  deleteById(@User() { userId }: JWTPayload, @Param('id') id: string) {
    return this.commentsService.deleteById(id, userId);
  }
}
