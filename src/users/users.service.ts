import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SignUpReturnType } from '../auth/interfaces/auth.interface';
import { MemberEntity } from '../auth/entities/member.entity';
import { PrismaService } from 'src/prisma.service';
import { PasswordService } from 'src/auth/services/password.service';
import { userSelectValidator } from './validators/user.select';
import { UpdateUserPreferencesDto } from './dto/update-user-preferences.dto';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<SignUpReturnType> {
    //check if email is used
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email is already in use!');
    }
    //if emaill doesnt exist create user
    //hash the password
    createUserDto.password = await this.passwordService.hash(
      createUserDto.password,
    );
    //insert the user in database
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        preferredSources: createUserDto.preferredSources,
      },
    });
    //return the specific parameters about user to frontend
    return {
      user: new MemberEntity(user),
    };
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      select: userSelectValidator(),
    });
  }

  async getUserPrefernces(id: number): Promise<string[]> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { preferredSources: true },
    });
    if (!user) {
      throw new UnauthorizedException(`User with ID ${id} not found`);
    }
    return user.preferredSources ?? [];
  }
  async findById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new UnauthorizedException(`User with ID ${id} not found`);
    }
    return user;
  }
  async updateUserPreferences(
    id: number,
    updateUserPreferencesDto: UpdateUserPreferencesDto,
  ): Promise<string[]> {
    const user = await this.findById(id);
    const updatedPreferences = await this.prisma.user.update({
      where: { id },
      data: { preferredSources: updateUserPreferencesDto.preferredSources },
    });
    return updatedPreferences.preferredSources ?? [];
  }
}
