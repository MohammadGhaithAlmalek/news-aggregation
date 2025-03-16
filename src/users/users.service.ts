import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SignUpReturnType } from '../auth/interfaces/auth.interface';
import { MemberEntity } from '../auth/entities/member.entity';
import { PasswordService } from 'src/auth/services/password.service';
import { UpdateUserPreferencesDto } from './dto/update-user-preferences.dto';
import { UserRepository } from './repositories/user.repository';
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private passwordService: PasswordService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<SignUpReturnType> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new UnauthorizedException('Email is already in use!');
    }
    createUserDto.password = await this.passwordService.hash(
      createUserDto.password,
    );
    const user = await this.userRepository.createUser(createUserDto);
    return { user: new MemberEntity(user) };
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: number) {
    return this.userRepository.findById(id);
  }

  async getUserPreferences(id: number): Promise<string[]> {
    return this.userRepository.getUserPreferences(id);
  }

  async updateUserPreferences(
    id: number,
    updateUserPreferencesDto: UpdateUserPreferencesDto,
  ): Promise<string[]> {
    return this.userRepository.updateUserPreferences(
      id,
      updateUserPreferencesDto,
    );
  }
}
