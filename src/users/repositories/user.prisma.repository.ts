import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/services/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserPreferencesDto } from '../dto/update-user-preferences.dto';
import { userSelectValidator } from '../validators/user.select';
import { UserRepository } from './user.repository';
import { UserEntity } from '../entities/user.entity';
@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  //without password
  async createUser(
    createUserDto: CreateUserDto,
    hashedPassword: string,
  ): Promise<Partial<UserEntity>> {
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        preferredSources: createUserDto.preferredSources,
      },
    });
    return new UserEntity(user).toJSON();
  }
  //with password
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: userSelectValidator(),
    });
    if (!user) {
      return null;
    }
    return new UserEntity(user);
  }
  //without password
  async findById(id: number): Promise<Partial<UserEntity>> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new UnauthorizedException(`User with ID ${id} not found`);
    }
    return new UserEntity(user);
  }

  async getUserPreferences(id: number): Promise<string[]> {
    const user = await this.findById(id);
    return user.preferredSources ?? [];
  }

  async updateUserPreferences(
    id: number,
    updateUserPreferencesDto: UpdateUserPreferencesDto,
  ): Promise<string[]> {
    await this.findById(id);
    const updatedPreferences = await this.prisma.user.update({
      where: { id },
      data: { preferredSources: updateUserPreferencesDto.preferredSources },
    });
    return updatedPreferences.preferredSources ?? [];
  }
}
