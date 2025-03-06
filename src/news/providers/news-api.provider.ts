import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import NewsAPI from 'newsapi';
import { NewsProvider } from '../interfaces/news-provider.interface';
import { ConfigService } from '@nestjs/config';
import { NewsEntity } from '../entities/news.entity';
import {
  NewsApiArticle,
  NewsApiResponse,
} from '../interfaces/newsapi.interface';
import { NewsApiRequestParams } from '../interfaces/news-api-request-params';

@Injectable()
export class NewsApiProvider implements NewsProvider {
  private readonly NewsAPI: string | undefined;

  constructor(
    private readonly configService: ConfigService,
    @Inject('NewsAPI') private readonly newsapi: NewsAPI,
  ) {
    this.NewsAPI = this.configService.get<string>('NEWS_API_KEY');
  }

  async getNews(
    preferredSources: string[] = [],
    search?: string,
    category?: string,
    page: number = 1,
  ): Promise<NewsEntity[]> {
    try {
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

      return response.articles.map((article: NewsApiArticle) => ({
        id: article.source.id,
        title: article.title,
        description: article.description || 'No description available',
        author: article.author || 'Unknown',
        url: article.url,
        source: article.source.name,
        category: category || 'General',
        publishedAt: new Date(article.publishedAt),
        thumbnail: article.urlToImage || '',
        createdAt: new Date(),
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new InternalServerErrorException(
        'Failed to fetch news from NewsAPI.',
      );
    }
  }
}
