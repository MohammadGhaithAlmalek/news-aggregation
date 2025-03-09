import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import NewsAPI from 'newsapi';
import { NewsProvider } from '../interfaces/news-provider.interface';
import { ConfigService } from '@nestjs/config';
import { NewsEntity } from '../entities/news.entity';
import { NewsApiResponse } from '../interfaces/newsapi.interface';
import { NewsApiRequestParams } from '../interfaces/news-api-request-params';
import { mapNewsApiArticle } from '../mappers/newsapi.mapper';

@Injectable()
export class NewsApiProvider implements NewsProvider {
  private readonly NewsAPI: string | undefined;

  constructor(
    private readonly configService: ConfigService,
    @Inject('NewsAPI') private readonly newsapi: NewsAPI,
  ) {
    const apiKey = this.configService.get<string>('NEWS_API_KEY');
    if (!apiKey) {
      throw new UnauthorizedException('Missing NewsAPI key');
    }
    this.NewsAPI = apiKey;
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
