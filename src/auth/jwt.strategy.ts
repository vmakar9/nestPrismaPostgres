import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'node:process';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(private userService:UsersService) {
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AUTH_JWT_SECRET
    });
  }

  async validate(payload:{userId:number}){
    const user = await this.userService.findOne(payload.userId)
    if(!user){
      throw new UnauthorizedException()
    }
    return user;
  }
}