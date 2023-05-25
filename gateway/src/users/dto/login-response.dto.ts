export class LoginResponseDto {
  accessToken: string;

  refreshToken: string;

  userId: string;

  errors: string[];

  success: boolean;
}
