// users/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { User } from '../db/entities'

@ApiTags('Register')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({type: User})
  @ApiResponse({ status: 201, description: 'User registered successfully', type: User })
  async register(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const user = await this.userService.createUser(username, password);
    return { message: 'User registered successfully', user };
  }
}
