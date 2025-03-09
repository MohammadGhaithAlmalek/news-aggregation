import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NewsProvider } from '../interfaces/news-provider.interface';
import { ConfigService } from '@nestjs/config';
import Guardian from 'guardian-js';
import { NewsEntity } from '../entities/news.entity';
import { GuardianResponse } from '../interfaces/guardian.interface';
import { mapGuardianArticle } from '../mappers/guardian.mapper';

@Injectable()
export class GuardianProvider implements NewsProvider {
  private guardian: Guardian;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GUARDIAN_NEWS_KEY');
    if (!apiKey) {
      throw new UnauthorizedException('Missing Guardian API key');
    }
    this.guardian = new Guardian(apiKey, true);
  }

  async getNews(
    preferredSources: string[],
    search?: string,
    category?: string,
    page: number = 1,
  ): Promise<NewsEntity[]> {
    const response = (await this.guardian.content.search(search || '', {
      section: category || 'world',
      page: page,
      'show-fields': 'trailText,byline,thumbnail',
    })) as GuardianResponse;

    return response.results.map(mapGuardianArticle);
  }
}
