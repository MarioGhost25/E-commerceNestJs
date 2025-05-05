import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginAuthDto } from './dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Replace 'any' with your actual user entity type

    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {

    try {

      const { password, ...data } = createUserDto;

      const user = this.userRepository.create({
        ...data,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };

    } catch (error) {
       this.handleDBErrors(error);
    }
    
  }

  async login(loginAuthDto: LoginAuthDto){
    
    const {email, password} = loginAuthDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    });

    if(!user)
      throw new UnauthorizedException('Credentials are not valid (email)')

    if(!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)')

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
      
  }

  private getJwtToken (payload: JwtPayload){

    const token = this.jwtService.sign( payload );
    return token;

  }

  private handleDBErrors( error: any ): never {
    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }

}
