import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, required: true, example: 'email@email.com' })
  @IsNotEmpty()
  @IsString()
  email!: string;

  @ApiProperty({ type: String, required: true, example: '0123456' })
  @IsNotEmpty()
  @IsString()
  password!: string;
}
