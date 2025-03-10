export interface NewsApiRequestParams {
  q?: string;
  language: string;
  page: number;
  pageSize: number;
  category?: ApiNewsCategory;
  sources?: Array<string>;
}

export enum ApiNewsCategory {
  BUSINESS = 'business',
  ENTERTAINMENT = 'entertainment',
  GENERAL = 'general',
  HEALTH = 'health',
  SCIENCE = 'science',
  SPORTS = 'sports',
  TECHNOLOGY = 'technology',
}
