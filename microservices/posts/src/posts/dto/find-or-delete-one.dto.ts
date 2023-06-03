import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOrDeleteOneDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  id: string;
}
