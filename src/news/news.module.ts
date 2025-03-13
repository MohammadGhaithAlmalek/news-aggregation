import { Module } from '@nestjs/common';
import { NewsService } from './services/news.service';
import { NewsController } from './news.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { NewsProviderFactory } from './providers/news-provider-factory';
import { BbcProvider } from './providers/bbc.provider';
import { GuardianProvider } from './providers/guardian.provider';
import { NytProvider } from './providers/nyt.provider';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CbcProvider } from './providers/cbc.provider';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from 'src/configs/app-options.constants';
@Module({
  controllers: [NewsController],
  providers: [
    ConfigService,
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
  imports: [ConfigModule, UsersModule, CacheModule.registerAsync(RedisOptions)],
})
export class NewsModule {}
