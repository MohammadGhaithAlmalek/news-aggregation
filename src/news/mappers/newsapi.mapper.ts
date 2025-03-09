import { NewsApiArticle } from '../interfaces/newsapi.interface';
import { NewsEntity } from '../entities/news.entity';

export function mapNewsApiArticle(article: NewsApiArticle): NewsEntity {
  return {
    id: article.source.id,
    title: article.title,
    description: article.description || 'No description available',
    author: article.author || 'Unknown',
    url: article.url,
    source: article.source.name,
    category: 'General',
    publishedAt: new Date(article.publishedAt),
    thumbnail: article.urlToImage || '',
    createdAt: new Date(),
  };
}
