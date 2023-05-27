import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  UsersServiceI,
  VerifyTokenResponse,
} from './interfaces/users.interface';
import { LoginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/Register.dto';
import { Observable, lastValueFrom } from 'rxjs';
import { LoginResponseDto } from './dto/login-response.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@Inject('USERS_PACKAGE') private client: ClientGrpc) {}

  private usersService: UsersServiceI;
  onModuleInit() {
    this.usersService = this.client.getService<UsersServiceI>('UsersService');
  }

  login(loginDto: LoginDto): Observable<LoginResponseDto> {
    return this.usersService.login(loginDto);
  }

  register(registerDto: RegisterDto): Observable<any> {
    return this.usersService.register(registerDto);
  }

  async verifyToken(
    verifyTokenDto: VerifyTokenDto,
  ): Promise<VerifyTokenResponse> {
    const res = await lastValueFrom(
      this.usersService.verifyToken(verifyTokenDto),
    );
    return res;
  }
}
