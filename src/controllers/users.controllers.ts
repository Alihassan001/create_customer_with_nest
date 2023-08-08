// users/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const user = await this.userService.createUser(username, password);
    return { message: 'User registered successfully', user };
  }
}
