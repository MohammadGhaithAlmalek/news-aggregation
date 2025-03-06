import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { NewsProviderFactory } from './providers/news-provider-factory';
import { NewsApiProvider } from './providers/news-api.provider';
import { GuardianProvider } from './providers/guardian.provider';
import { NytProvider } from './providers/nyt.provider';
import NewsAPI from 'newsapi';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
@Module({
  controllers: [NewsController],
  providers: [
    ConfigService,
    {
      provide: 'NewsAPI',
      useFactory: (configService: ConfigService): NewsAPI => {
        const apiKey = configService.get<string>('NEWS_API_KEY');
        if (!apiKey) {
          throw new Error('NEWS_API_KEY is not defined');
        }
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
