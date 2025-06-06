import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get<string>('JWT_SECRET') || 'default',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }


    async validate(payload: JwtPayload): Promise<User> {

        const { id } = payload;

        const user = await this.userRepository.findOneBy({ id });

        if(!user)
            throw new UnauthorizedException('Token not valid');


        return user;
    }
}