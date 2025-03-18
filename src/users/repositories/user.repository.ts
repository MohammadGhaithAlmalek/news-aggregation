import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserPreferencesDto } from '../dto/update-user-preferences.dto';
import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
  createUser(
    createUserDto: CreateUserDto,
    hashedPassword: string,
  ): Promise<Partial<UserEntity>>;

  findByEmail(email: string): Promise<UserEntity | null>;

  findById(id: number): Promise<Partial<UserEntity>>;

  getUserPreferences(id: number): Promise<string[]>;

  updateUserPreferences(
    id: number,
    updateUserPreferencesDto: UpdateUserPreferencesDto,
  ): Promise<string[]>;
}
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
