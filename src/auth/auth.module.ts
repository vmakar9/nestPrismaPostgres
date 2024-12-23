import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports:[PrismaModule,
  PassportModule,
  JwtModule.register({
    secret: process.env.AUTH_JWT_SECRET,
    signOptions:{expiresIn:'1h'}
  }),
  UsersModule]
})
export class AuthModule {}
