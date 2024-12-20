import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { handleServiceError } from '../utils/error-handler';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity})
 async create(@Body() createUserDto: CreateUserDto) {
    try {
      return new UserEntity(await this.usersService.create(createUserDto))
    }catch (error){
      handleServiceError(error,HttpStatus.BAD_REQUEST,"Error creating the user.");
    }

  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray:true})
 async findAll() {
    try {
      const users = await this.usersService.findAll();
      return users.map((user) => new UserEntity(user));
    }catch (error) {
      handleServiceError(error,HttpStatus.INTERNAL_SERVER_ERROR,"Error fetching users." );
    }

  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity})
  async findOne(@Param('id',ParseIntPipe) id: number) {
    try {
      return new UserEntity(await this.usersService.findOne(id));
    }catch (error) {
      handleServiceError(error,HttpStatus.NOT_FOUND,"Not Found")
    }

  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity})
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      return new UserEntity(await this.usersService.update(id, updateUserDto));
    }catch (error) {
      handleServiceError(error,HttpStatus.BAD_REQUEST, "Error to update user")
    }

  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity})
 async remove(@Param('id',ParseIntPipe) id: number) {
    try {
      return new UserEntity(await this.usersService.remove(id));
    }catch (error) {
      handleServiceError(error,HttpStatus.CONFLICT, "ERROR to delete user")
    }

  }
}
