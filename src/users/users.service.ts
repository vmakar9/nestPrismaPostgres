import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from "bcrypt"
import * as process from 'node:process';

@Injectable()
export class UsersService {
  constructor(private prisma:PrismaService) {
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      +process.env.ROUNDS_OF_HASH
    )

    createUserDto.password = hashedPassword

    return this.prisma.user.create({
      data:createUserDto
    })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({where:{id}})
  }

 async update(id: number, updateUserDto: UpdateUserDto) {
    if(updateUserDto.password){
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        process.env.ROUNDS_OF_HASH
      )
    }

    return this.prisma.user.update({
      where:{id},
      data: updateUserDto
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({where:{id}})
  }
}
