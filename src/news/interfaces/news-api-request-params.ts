export interface NewsApiRequestParams {
  q?: string;
  language: string;
  page: number;
  pageSize: number;
  category?: string;
  country?: string;
  sources?: string;
}
