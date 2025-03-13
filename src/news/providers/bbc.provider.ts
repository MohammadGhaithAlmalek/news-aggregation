import { Injectable, UnauthorizedException } from '@nestjs/common';
import NewsAPI from 'ts-newsapi';
import { NewsProvider } from './news-provider.interface';
import { NewsEntity } from '../entities/news.entity';
import { NewsApiResponse } from '../interfaces/newsapi.interface';
import {
  NewsApiRequestParams,
  ApiNewsCategory,
} from '../interfaces/news-api-request-params';
import { mapNewsApiArticle } from '../mappers/newsapi.mapper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BbcProvider implements NewsProvider {
  private readonly newsapi: NewsAPI;
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('NEWS_API_KEY');
    if (!apiKey) {
      throw new UnauthorizedException('Missing BBC API key');
    }
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
      sources: ['bbc-news'],
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
//repository pattern nestjs
//leetcode
