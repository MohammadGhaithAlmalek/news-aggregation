import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async signPayload(payload: { id: number }): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
