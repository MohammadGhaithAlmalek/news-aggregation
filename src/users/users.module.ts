import { PrismaService } from 'src/common/prisma/services/prisma.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PasswordService } from 'src/auth/services/password.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, PasswordService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
