import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { PrismaService } from 'src/common/prisma/services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/TokenService';
import { JWTStrategy } from './guards/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    PasswordService,
    TokenService,
    JWTStrategy,
  ],
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: env.JWT_TOKEN_SECRET,
      }),
    }),
  ],
})
export class AuthModule {}
