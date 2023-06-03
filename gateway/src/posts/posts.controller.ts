import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/users/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/decorators/user.decorator';
import { JWTPayload } from 'src/users/interfaces/users.interface';

@UseGuards(AuthGuard)
@Controller('posts')
@ApiTags('Post')
@ApiBearerAuth()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @User() { userId }: JWTPayload) {
    return this.postsService.create(createPostDto, userId);
  }

  @Get()
  findAll(@User() { userId }: JWTPayload) {
    return this.postsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() { userId }: JWTPayload) {
    return this.postsService.findOne({ id, userId });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @User() { userId }: JWTPayload,
  ) {
    return this.postsService.update(id, updatePostDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() { userId }: JWTPayload) {
    return this.postsService.remove(id, userId);
  }
}
