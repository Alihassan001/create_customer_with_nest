import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from '../services';
import { User } from '../db/entities';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body('name') name: string): Promise<User> {
    return this.userService.createUser(name);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body('name') name: string): Promise<User> {
    return this.userService.updateUser(id, name);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
