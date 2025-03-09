import { GuardianArticle } from '../interfaces/guardian.interface';
import { NewsEntity } from '../entities/news.entity';

export function mapGuardianArticle(article: GuardianArticle): NewsEntity {
  return {
    id: article.id,
    title: article.webTitle,
    description: article.fields?.trailText || 'No description available',
    author: article.fields?.byline || 'Unknown',
    url: article.webUrl,
    source: 'The Guardian',
    category: 'General',
    publishedAt: new Date(article.webPublicationDate),
    thumbnail: article.fields?.thumbnail || '',
    createdAt: new Date(),
  };
}
