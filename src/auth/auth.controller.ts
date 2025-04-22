import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService ) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.login(loginAuthDto);
  }
}

