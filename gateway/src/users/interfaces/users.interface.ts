import { Observable } from 'rxjs';
import { LoginResponseDto } from '../dto/login-response.dto';
import { RegisterResponseDto } from '../dto/register-response.dto';

export interface Register {
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface VerifyTokenInput {
  token: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
}
export interface VerifyTokenResponse {
  success: boolean;

  errors: string[];

  payload: JWTPayload;
}

export interface UsersServiceI {
  login(data: Login): Observable<LoginResponseDto>;

  register(data: Register): Observable<RegisterResponseDto>;

  verifyToken(data: VerifyTokenInput): Observable<VerifyTokenResponse>;
}
