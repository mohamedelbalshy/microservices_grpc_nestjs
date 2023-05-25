import { Observable } from 'rxjs';
import { Login } from './interfaces/login.interface';
import { Register } from './interfaces/register.interface';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

export interface UsersServiceI {
  login(data: Login): Observable<LoginResponseDto>;

  register(data: Register): Observable<RegisterResponseDto>;
}
