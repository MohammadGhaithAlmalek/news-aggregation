import { NewsEntity } from '../entities/news.entity';

export interface NewsProvider {
  getNews(
    preferredSources: string[],
    search?: string,
    category?: string,
    page?: number,
  ): Promise<NewsEntity[]>;
}
