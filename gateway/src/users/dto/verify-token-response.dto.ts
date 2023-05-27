import { JWTPayload } from '../interfaces/users.interface';

export class VerifyTokenResponseDto {
  payload: JWTPayload;

  errors: string[];

  success: boolean;
}
