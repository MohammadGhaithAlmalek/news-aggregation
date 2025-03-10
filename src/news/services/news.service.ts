import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsProviderFactory } from '../providers/news-provider-factory';
import { NewsEntity } from '../entities/news.entity';

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
      throw new NotFoundException('User has no preferred sources.');
    }

    try {
      const results: NewsEntity[] = [];

      for (const source of preferredSources) {
        const provider = this.newsProviderFactory.getProvider(source);
        const providerResults = await provider.getNews(search, category, page);
        results.push(...providerResults);
      }

      return results;
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }
}
