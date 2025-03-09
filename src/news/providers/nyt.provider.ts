import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NewsProvider } from '../interfaces/news-provider.interface';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { NewsEntity } from '../entities/news.entity';
import { NytResponse } from '../interfaces/nyt.interface';
import { mapNytArticle } from '../mappers/nyt.mapper';

@Injectable()
export class NytProvider implements NewsProvider {
  private readonly nytApiKey: string | undefined;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('NYT_NEWS_KEY');
    if (!apiKey) {
      throw new UnauthorizedException('Missing NYT API key');
    }
    this.nytApiKey = apiKey;
  }

  async getNews(
    preferredSources: string[],
    search?: string,
    category?: string,
    page: number = 1,
  ): Promise<NewsEntity[]> {
    const response = await axios.get(
      'https://api.nytimes.com/svc/search/v2/articlesearch.json',
      {
        params: {
          q: search || '',
          'api-key': this.nytApiKey,
          page: page,
        },
      },
    );

    const nytResponse = response.data as NytResponse;

    return nytResponse.response.docs.map(mapNytArticle);
  }
}
