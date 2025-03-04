import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PasswordService } from 'src/auth/services/password.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, PasswordService],
  exports: [UsersService],
})
export class UsersModule {}
