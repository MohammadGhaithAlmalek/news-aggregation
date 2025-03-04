export class NewsEntity {
  id: string;
  title: string;
  description: string;
  author: string;
  url: string;
  source: string;
  category: string;
  publishedAt: Date;
  thumbnail: string;
  createdAt: Date;

  constructor(news: {
    id: string;
    title: string;
    description: string;
    author: string;
    url: string;
    source: string;
    category: string;
    publishedAt: Date;
    thumbnail: string;
    createdAt: Date;
  }) {
    this.id = news.id;
    this.title = news.title;
    this.description = news.description;
    this.author = news.author;
    this.url = news.url;
    this.source = news.source;
    this.category = news.category;
    this.publishedAt = news.publishedAt;
    this.thumbnail = news.thumbnail;
    this.createdAt = news.createdAt;
  }
}
