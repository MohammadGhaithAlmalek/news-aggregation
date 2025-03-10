import { Module } from '@nestjs/common';
import { NewsService } from './services/news.service';
import { NewsController } from './news.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { NewsProviderFactory } from './providers/news-provider-factory';
import { NewsApiProvider } from './providers/bbc.provider';
import { GuardianProvider } from './providers/guardian.provider';
import { NytProvider } from './providers/nyt.provider';
import NewsAPI from 'ts-newsapi';
import { APP_GUARD } from '@nestjs/core';
import Guardian from 'guardian-js';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiKeyService } from './services/api-key.service';
@Module({
  controllers: [NewsController],
  providers: [
    ConfigService,
    ApiKeyService,
    {
      provide: 'NewsAPI',
      useFactory: (configService: ConfigService): NewsAPI => {
        const apiKey = configService.get<string>('NEWS_API_KEY');
        if (!apiKey) {
          throw new Error('NEWS_API_KEY is not defined');
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
    NewsApiProvider,
    GuardianProvider,
    NytProvider,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  imports: [ConfigModule, UsersModule],
})
export class NewsModule {}
