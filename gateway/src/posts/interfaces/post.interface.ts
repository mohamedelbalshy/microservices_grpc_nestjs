import { Observable } from 'rxjs';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { FindOrDeleteOneDto } from '../dto/find-or-delete-one.dto';

export interface PostResponse extends CreatePostDto {
  id: string;
  success: boolean;
  errors: string[];
}

export interface PostsServiceI {
  create(data: CreatePostDto): Observable<PostResponse>;
  updateById(data: UpdatePostDto): Observable<PostResponse>;
  deleteById(data: any): Observable<any>;
  findOne(data: FindOrDeleteOneDto): Observable<PostResponse>;
  findMany(data: { userId: string }): Observable<PostResponse[]>;
}
