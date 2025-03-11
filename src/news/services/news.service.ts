import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NewsProviderFactory } from '../providers/news-provider-factory';
import { NewsEntity } from '../entities/news.entity';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class NewsService {
  constructor(
    private readonly newsProviderFactory: NewsProviderFactory,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getNews(
    userId,
    preferredSources: string[],
    search?: string,
    category?: string,
    page: number = 1,
  ): Promise<NewsEntity[]> {
    if (!preferredSources || preferredSources.length === 0) {
      throw new NotFoundException('User has no preferred sources.');
    }

    const cacheKey = `news:${userId}:${preferredSources.join(',')}:${search || ''}:${category || ''}:${page}`;
    const cachedData = await this.cacheManager.get<NewsEntity[]>(cacheKey);

    if (cachedData) {
      console.log('hi');
      return cachedData;
    }
    try {
      const results: NewsEntity[] = [];

      for (const source of preferredSources) {
        const provider = this.newsProviderFactory.getProvider(source);
        const providerResults = await provider.getNews(search, category, page);
        results.push(...providerResults);
      }
      await this.cacheManager.set(cacheKey, results);
      return results;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error('Failed to fetch news.');
    }
  }
}
