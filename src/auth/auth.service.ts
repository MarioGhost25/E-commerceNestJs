import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'prisma/prisma-service';


@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async SingUp(registerAuthDto: RegisterAuthDto) {
    const newUser = await this.prismaService.user.create({
      data: registerAuthDto,
    });

    const {name, email} = newUser;

    return {
      user:{
        name,
        email,
      }
      
    }
  }

  async login(loginAuthDto: LoginAuthDto){
    const {email, password} = loginAuthDto;
    const user = await this.prismaService.user.findUnique({
      where:{
        email
      }
    })
    
    if(!user) throw new NotFoundException('User not found');
    if(user.password !== password) throw new BadRequestException('Invalid password');

    return user;
  }

  

}
