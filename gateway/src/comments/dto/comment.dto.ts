import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content!: string;

  userId!: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  postId: string;
}

export class FindManyCommentsDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  postId!: string;
}

export class UpdateCommentDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
