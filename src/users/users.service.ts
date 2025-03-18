import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { PasswordService } from 'src/auth/services/password.service';
import { UpdateUserPreferencesDto } from './dto/update-user-preferences.dto';
import {
  USER_REPOSITORY,
  UserRepository,
} from './repositories/user.repository';
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private passwordService: PasswordService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new UnauthorizedException('email is already exist');
    }
    const hashedPassword = await this.passwordService.hash(
      createUserDto.password,
    );

    return this.userRepository.createUser(createUserDto, hashedPassword);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: number): Promise<Partial<UserEntity>> {
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
