import { Inject, Injectable } from '@nestjs/common';
import NewsAPI from 'newsapi';
import { NewsProvider } from '../interfaces/news-provider.interface';
import { NewsEntity } from '../entities/news.entity';
import { NewsApiResponse } from '../interfaces/newsapi.interface';
import { NewsApiRequestParams } from '../interfaces/news-api-request-params';
import { mapNewsApiArticle } from '../mappers/newsapi.mapper';
import { ApiKeyService } from '../services/api-key.service';

@Injectable()
export class NewsApiProvider implements NewsProvider {
  constructor(
    @Inject('NewsAPI') private readonly newsapi: NewsAPI,
    private readonly apiKeyService: ApiKeyService,
  ) {
    const apiKey = this.apiKeyService.getApiKey('NEWS_API_KEY');
    this.newsapi = apiKey;
  }

  async getNews(
    preferredSources: string[] = [],
    search?: string,
    category?: string,
    page: number = 1,
  ): Promise<NewsEntity[]> {
    const requestParams: NewsApiRequestParams = {
      q: search,
      language: 'en',
      page: page,
      pageSize: 10,
    };

    if (category) {
      requestParams.category = category;
      requestParams.country = 'us';
    }

    if (preferredSources.length) {
      requestParams.sources = preferredSources.join(',');
    }

    const response = (await this.newsapi.v2.topHeadlines(
      requestParams,
    )) as NewsApiResponse;

    return response.articles.map(mapNewsApiArticle);
  }
}
