import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOrDeleteOneDto {
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  id: string;
}
