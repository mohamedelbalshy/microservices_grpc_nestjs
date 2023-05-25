import { BadRequestException, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserEntity } from './user.entity';
import { Register } from './interfaces/register.interface';
import { JWTPayload } from './dto/jwtPayload.dto';
import { Login } from './interfaces/login.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  @GrpcMethod('UsersService', 'login')
  async login(data: Login) {
    const { email, password } = data;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      return {
        success: false,
        errors: ['wrong credentials!'],
      };
    }

    const passwordMatch = await bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return {
        success: false,
        errors: ['wrong credentials!'],
      };
    }
    const payload: JWTPayload = {
      email,
      userId: user.uuid,
    };

    const accessToken = await this.jwtService.sign(payload);
    const refreshToken = await this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '30d',
    });

    return {
      refreshToken,
      accessToken,
      userId: user.uuid,
      success: true,
    };
  }

  @GrpcMethod('UsersService', 'register')
  async register(data: Register) {
    const { email, password } = data;
    const userExists = await this.userRepo.exist({ where: { email } });
    if (userExists) {
      return {
        success: false,
        errors: [`User with email: ${email} already exist!`],
      };
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = new UserEntity();
    user.email = email;
    user.password = hashedPassword;
    await this.userRepo.save(user);
    return { success: true, errors: [] };
  }
}
