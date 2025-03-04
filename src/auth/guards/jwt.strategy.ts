import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtTokenReturnType } from '../interfaces/jwt.interface';
import { ConfigService } from '@nestjs/config';
import { authConstants } from './auth.constant';
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_TOKEN_SECRET') as string,
    });
  }

  validate(payload: { id: number }): JwtTokenReturnType {
    return { userId: payload.id };
  }
}
