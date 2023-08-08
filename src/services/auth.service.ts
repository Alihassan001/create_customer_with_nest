// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services';
import { User } from '../db/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: any): Promise<User> {
    return this.userService.getUserById(payload.sub);
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    if (!user || !(await user.comparePassword(password))) {
      return null;
    }

    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
