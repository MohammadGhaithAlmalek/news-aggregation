import { NewsEntity } from '../entities/news.entity';

export interface NewsProvider {
  getNews(
    search?: string,
    category?: string,
    page?: number,
  ): Promise<NewsEntity[]>;
}
