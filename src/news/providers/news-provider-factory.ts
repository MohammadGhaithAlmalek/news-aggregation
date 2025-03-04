import { Injectable } from '@nestjs/common';
import { NewsProvider } from '../interfaces/news-provider.interface';
import { NewsApiProvider } from './news-api.provider';
import { NytProvider } from './nyt.provider';
import { GuardianProvider } from './guardian.provider';

@Injectable()
export class NewsProviderFactory {
  constructor(
    private readonly newsApiProvider: NewsApiProvider,
    private readonly guardianProvider: GuardianProvider,
    private readonly nytProvider: NytProvider,
  ) {}

  getProvider(source: string): NewsProvider {
    switch (source.toLowerCase()) {
      case 'bbc-news':
        return this.newsApiProvider;
      case 'cbc-news':
        return this.newsApiProvider;
      case 'guardian':
        return this.guardianProvider;
      case 'nyt':
        return this.nytProvider;
      default:
        throw new Error(`Unsupported source: ${source}`);
    }
  }
}
