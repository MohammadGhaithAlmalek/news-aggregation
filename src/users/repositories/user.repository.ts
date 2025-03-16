import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/services/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserPreferencesDto } from '../dto/update-user-preferences.dto';
import { userSelectValidator } from '../validators/user.select';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        preferredSources: createUserDto.preferredSources,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: userSelectValidator(),
    });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new UnauthorizedException(`User with ID ${id} not found`);
    }
    return user;
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
