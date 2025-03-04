export interface NewsProvider {
  getNews(
    preferredSources: string[],
    search?: string,
    category?: string,
    page?: number,
  ): Promise<any>;
}
