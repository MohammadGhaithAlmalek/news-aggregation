import { Inject, Injectable } from '@nestjs/common';
import { NewsProvider } from '../interfaces/news-provider.interface';
import { ApiKeyService } from '../services/api-key.service';
import Guardian from 'guardian-js';
import { NewsEntity } from '../entities/news.entity';
import { GuardianResponse } from '../interfaces/guardian.interface';
import { mapGuardianArticle } from '../mappers/guardian.mapper';

@Injectable()
export class GuardianProvider implements NewsProvider {
  constructor(
    @Inject('GuardianAPI') private readonly guardian: Guardian,
    private readonly apiKeyService: ApiKeyService,
  ) {
    const apiKey = this.apiKeyService.getApiKey('GUARDIAN_NEWS_KEY');
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
