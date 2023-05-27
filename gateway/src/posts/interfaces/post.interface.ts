import { Observable } from 'rxjs';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

export interface PostResponse extends CreatePostDto {
  id: string;
}

export interface PostsServiceI {
  create(data: CreatePostDto): Observable<PostResponse>;
  updateById(data: UpdatePostDto): Observable<PostResponse>;
  deleteById(data: any): Observable<any>;
  findOne(data: any): Observable<PostResponse>;
  findMany(data: any): Observable<PostResponse[]>;
}
