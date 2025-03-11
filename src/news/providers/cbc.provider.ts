import { Inject, Injectable } from '@nestjs/common';
import NewsAPI from 'ts-newsapi';
import { NewsProvider } from './news-provider.interface';
import { NewsEntity } from '../entities/news.entity';
import { NewsApiResponse } from '../interfaces/newsapi.interface';
import {
  NewsApiRequestParams,
  ApiNewsCategory,
} from '../interfaces/news-api-request-params';
import { mapNewsApiArticle } from '../mappers/newsapi.mapper';
import { ApiKeyService } from '../services/api-key.service';

@Injectable()
export class CbcProvider implements NewsProvider {
  constructor(
    @Inject('CBC_API') private readonly newsapi: NewsAPI,
    private readonly apiKeyService: ApiKeyService,
  ) {
    const apiKey = this.apiKeyService.getApiKey('BBC_API_KEY');
    this.newsapi = new NewsAPI(apiKey);
  }

  async getNews(
    search?: string,
    category?: ApiNewsCategory,
    page: number = 1,
  ): Promise<NewsEntity[]> {
    const requestParams: NewsApiRequestParams = {
      q: search,
      language: 'en',
      page: page,
      pageSize: 10,
      sources: ['cbc-news'],
    };

    if (category) {
      requestParams.category = category;
    }
    const response = (await this.newsapi.getTopHeadlines(
      requestParams,
    )) as NewsApiResponse;

    return response.articles.map(mapNewsApiArticle);
  }
}
