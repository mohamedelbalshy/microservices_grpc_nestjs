import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  
  @IsEmpty()
  userId: string;

  @ApiProperty({ type: String, required: true, example: 'title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'https://example.com',
  })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiProperty({ type: String, required: false, example: 'this is text' })
  @IsOptional()
  @IsString()
  text?: string;
}
