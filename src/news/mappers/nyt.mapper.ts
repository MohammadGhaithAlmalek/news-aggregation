import { NytArticle } from '../interfaces/nyt.interface';
import { NewsEntity } from '../entities/news.entity';

export function mapNytArticle(article: NytArticle): NewsEntity {
  return {
    id: article._id,
    title: article.headline.main,
    description: article.abstract || 'No description available',
    author: article.byline?.original || 'Unknown',
    url: article.web_url,
    source: 'New York Times',
    category: 'General',
    publishedAt: new Date(article.pub_date),
    thumbnail: article.multimedia?.[0]?.url
      ? `https://static01.nyt.com/${article.multimedia[0].url}`
      : '',
    createdAt: new Date(),
  };
}
