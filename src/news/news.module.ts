import { Module } from '@nestjs/common';
import { NewsService } from './services/news.service';
import { NewsController } from './news.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { NewsProviderFactory } from './providers/news-provider-factory';
import { BbcProvider } from './providers/bbc.provider';
import { GuardianProvider } from './providers/guardian.provider';
import { NytProvider } from './providers/nyt.provider';
import NewsAPI from 'ts-newsapi';
import { APP_GUARD } from '@nestjs/core';
import Guardian from 'guardian-js';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiKeyService } from './services/api-key.service';
import { CbcProvider } from './providers/cbc.provider';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
@Module({
  controllers: [NewsController],
  providers: [
    ConfigService,
    ApiKeyService,
    {
      provide: 'BBC_API',
      useFactory: (configService: ConfigService): NewsAPI => {
        const apiKey = configService.get<string>('BBC_API_KEY');
        if (!apiKey) {
          throw new Error('BBC_API_KEY is not defined');
        }
        return new NewsAPI(apiKey);
      },
      inject: [ConfigService],
    },
    {
      provide: 'CBC_API',
      useFactory: (configService: ConfigService): NewsAPI => {
        const apiKey = configService.get<string>('CBC_API_KEY');
        if (!apiKey) {
          throw new Error('CBC_API_KEY is not defined');
        }
        return new NewsAPI(apiKey);
      },
      inject: [ConfigService],
    },
    {
      provide: 'GuardianAPI',
      useFactory: (configService: ConfigService): Guardian => {
        const apiKey = configService.get<string>('GUARDIAN_NEWS_KEY');
        if (!apiKey) {
          throw new Error('GUARDIAN_NEWS_KEY is not defined');
        }
        return new Guardian(apiKey, true);
      },
      inject: [ConfigService],
    },
    NewsService,
    NewsProviderFactory,
    BbcProvider,
    CbcProvider,
    GuardianProvider,
    NytProvider,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  imports: [
    ConfigModule,
    UsersModule,
    CacheModule.registerAsync({
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
  ],
})
export class NewsModule {}
