import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PasswordService } from 'src/auth/services/password.service';
import { USER_REPOSITORY } from './repositories/user.repository';
import { UserPrismaRepository } from './repositories/user.prisma.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PasswordService,
    {
      provide: USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
