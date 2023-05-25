import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UsersServiceI } from './users.interface';
import { LoginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/Register.dto';
import { Observable } from 'rxjs';
import { LoginResponseDto } from './dto/login-response.dto';

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
}
