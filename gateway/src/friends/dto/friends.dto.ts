import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class SendRequestDto {
  @ApiProperty({ type: String, format: 'uuid', required: true })
  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}

export class AcceptRequestDto extends SendRequestDto {}

export class UnfriendDto extends SendRequestDto {}
