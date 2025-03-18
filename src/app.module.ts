import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './common/prisma/prisma.module';
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: 4,
          limit: 3,
        },
      ],
      errorMessage: 'To much requests.',
    }),
    UsersModule,
    AuthModule,
    NewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
