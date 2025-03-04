import { Injectable } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcryptjs';
@Injectable()
export class PasswordService {
  private readonly saltRounds = 5;
  async hash(value: string): Promise<string> {
    const salt = await genSalt(this.saltRounds);
    return await hash(value, salt);
  }
  async verify(plain: string, hashed: string) {
    return await compare(plain, hashed);
  }
}
