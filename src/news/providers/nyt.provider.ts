import { Injectable } from '@nestjs/common';
import { NewsProvider } from '../interfaces/news-provider.interface';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NytProvider implements NewsProvider {
  private readonly nytApiKey: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.nytApiKey = this.configService.get<string>('NYT_NEWS_KEY');
  }

  async getNews(
    preferredSources: string[],
    search?: string,
    category?: string,
    page: number = 1,
  ): Promise<any> {
    try {
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

      // Assuming the NYT API returns articles in response.data.response.docs
      return response.data.response.docs.map((article) => ({
        id: article._id,
        title: article.headline.main,
        description: article.abstract || 'No description available',
        author: article.byline?.original || 'Unknown',
        url: article.web_url,
        source: 'New York Times',
        category: category || 'General',
        publishedAt: new Date(article.pub_date),
        thumbnail: article.multimedia?.[0]?.url
          ? `https://static01.nyt.com/${article.multimedia[0].url}`
          : '',
        createdAt: new Date(),
      }));
    } catch (error) {
      console.error('Error fetching news from The New York Times:', error);
      throw new Error('Failed to fetch news from NYT.');
    }
  }
}
