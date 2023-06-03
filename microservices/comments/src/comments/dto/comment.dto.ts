import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsUUID()
  @IsNotEmpty()
  postId: string;
}

export class FindOrDeleteOneCommentDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}

export class FindManyCommentsDto {
  @IsUUID()
  @IsNotEmpty()
  postId!: string;
}

export class UpdateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsUUID()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsOptional()
  content?: string;
}
