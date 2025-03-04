import { Injectable } from '@nestjs/common';
import { NewsProvider } from '../interfaces/news-provider.interface';
import { ConfigService } from '@nestjs/config';
import Guardian from 'guardian-js';

@Injectable()
export class GuardianProvider implements NewsProvider {
  private guardian: Guardian;

  constructor(private readonly configService: ConfigService) {
    const apiKey: string =
      this.configService.get<string>('GUARDIAN_NEWS_KEY') || '';
    this.guardian = new Guardian(apiKey, true); // Use HTTPS
  }

  async getNews(
    preferredSources: string[],
    search?: string,
    category?: string,
    page: number = 1,
  ): Promise<any> {
    try {
      const response = await this.guardian.content.search(search || '', {
        section: category || 'world',
        page: page,
        'show-fields': 'trailText,byline,thumbnail',
      });

      return response.results.map((article) => ({
        id: article.id,
        title: article.webTitle,
        description: article.fields?.trailText || 'No description available',
        author: article.fields?.byline || 'Unknown',
        url: article.webUrl,
        source: 'The Guardian',
        category: category || 'General',
        publishedAt: new Date(article.webPublicationDate),
        thumbnail: article.fields?.thumbnail || '',
        createdAt: new Date(),
      }));
    } catch (error) {
      console.error('Error fetching news from The Guardian:', error);
      throw new Error('Failed to fetch news from The Guardian API.');
    }
  }
}
