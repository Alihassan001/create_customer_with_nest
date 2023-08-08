// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../services';
import { User } from '../../db/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'wkjfsjfsalfjsdoiafsajfdos', // Replace this with your secret key
    });
  }

  async validate(payload: any): Promise<User> {
    return this.authService.validateUser(payload);
  }
}
