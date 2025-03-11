import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import config from './config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],

      useFactory: async (config: ConfigService) => {
        const store = await redisStore({
          ttl: 300,
          socket: {
            host: config.get('redis.host'),
            port: config.get('redis.port'),
          },
        });
        return { store };
      },
    }),
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
  providers: [PrismaService],
  exports: [CacheModule],
})
export class AppModule {}
