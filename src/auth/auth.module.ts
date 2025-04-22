import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';


@Module({
  controllers: [ AuthController ],
  providers: [ AuthService ],
  imports: [ 

    ConfigModule,

    TypeOrmModule.forFeature([ User ]),

    

    
  ]
})
export class AuthModule {

}
