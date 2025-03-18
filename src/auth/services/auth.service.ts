import { PasswordService } from 'src/auth/services/password.service';
import { UsersService } from './../../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoginReturnType } from '../interfaces/auth.interface';
import { TokenService } from './TokenService';
import { UserEntity } from '../../users/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
    private passwordService: PasswordService,
  ) {}
  async login(loginUserDto: LoginUserDto): Promise<LoginReturnType> {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    if (!user) throw new UnauthorizedException('Email is not exist!');
    const passwordCorrected = await this.passwordService.verify(
      loginUserDto.password,
      user.password,
    );
    if (!passwordCorrected)
      throw new UnauthorizedException('passwor incorrect');
    const token = await this.tokenService.signPayload({ id: user.id });
    return {
      user: new UserEntity(user).toJSON(),
      token,
    };
  }
}
