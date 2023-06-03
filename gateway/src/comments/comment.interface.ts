import { CreateCommentDto, FindManyCommentsDto } from './dto/comment.dto';

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
}

export interface CommentResponse {
  erros: string[];
  success: boolean;
  comment: Comment;
}

export interface UpdateCommentInput {
  id: string;
  content: string;
  userId: string;
}

export interface FindOrDeleteOneCommentInput {
  id: string;
  userId: string;
}

export interface DeleteResponse {
  erros: string[];
  success: boolean;
}

export interface CommentsServiceI {
  create(createCommentDto: CreateCommentDto): CommentResponse;
  findMany(findManyCommentsDto: FindManyCommentsDto): CommentResponse[];
  updateById(updateCommentInput: UpdateCommentInput): CommentResponse;
  findOne(
    findOrDeleteOneCommentInput: FindOrDeleteOneCommentInput,
  ): CommentResponse;
  deleteById(
    findOrDeleteOneCommentInput: FindOrDeleteOneCommentInput,
  ): DeleteResponse;
}
