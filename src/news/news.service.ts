import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { NewsProviderFactory } from './providers/news-provider-factory';

@Injectable()
export class NewsService {
  constructor(private readonly newsProviderFactory: NewsProviderFactory) {}

  async getNews(
    preferredSources: string[],
    search?: string,
    category?: string,
    page: number = 1,
  ) {
    if (!preferredSources || preferredSources.length === 0) {
      throw new UnauthorizedException('User has no preferred sources.');
    }

    try {
      const results: any[] = [];

      for (const source of preferredSources) {
        const provider = this.newsProviderFactory.getProvider(source);
        const providerResults = await provider.getNews(
          preferredSources,
          search,
          category,
          page,
        );
        results.push(...providerResults);
      }

      return results;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new InternalServerErrorException(
        'Failed to fetch news from the selected sources.',
      );
    }
  }
}
