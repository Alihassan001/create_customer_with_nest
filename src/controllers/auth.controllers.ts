// auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { User } from '../db/entities'

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({type: User})
  @ApiResponse({ status: 200, description: 'User logged in successfully', type: User })
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const result = await this.authService.login(username, password);
    if (!result) {
      return { message: 'Invalid credentials' };
    }
    return result;
  }
}
