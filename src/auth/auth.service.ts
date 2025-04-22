import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginAuthDto } from './dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Replace 'any' with your actual user entity type
  ) {}

  async create(createUserDto: CreateUserDto) {

    try {

      const { password, ...data } = createUserDto;

      const user = this.userRepository.create({
        ...data,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);

      return user;

    } catch (error) {
       this.handleDBErrors(error);
    }
    
  }

  async login(loginAuthDto: LoginAuthDto){
    
    const {email, password} = loginAuthDto;
    
    
    
  }

  private handleDBErrors( error: any ): never {
    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }

}
