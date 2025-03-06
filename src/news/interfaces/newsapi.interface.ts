export interface NewsApiArticle {
  source: { id: string; name: string };
  title: string;
  description: string;
  author: string;
  url: string;
  publishedAt: string;
  urlToImage: string;
}

export interface NewsApiResponse {
  articles: NewsApiArticle[];
}
