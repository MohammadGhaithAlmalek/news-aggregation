import { Injectable } from '@nestjs/common';
import { NewsProvider } from './news-provider.interface';
import { BbcProvider } from './bbc.provider';
import { CbcProvider } from './cbc.provider';
import { NytProvider } from './nyt.provider';
import { GuardianProvider } from './guardian.provider';

@Injectable()
export class NewsProviderFactory {
  constructor(
    private readonly bbcProvider: BbcProvider,
    private readonly cbcProvider: CbcProvider,
    private readonly guardianProvider: GuardianProvider,
    private readonly nytProvider: NytProvider,
  ) {}

  getProvider(source: string): NewsProvider {
    switch (source.toLowerCase()) {
      case 'bbc-news':
        return this.bbcProvider;
      case 'cbc-news':
        return this.cbcProvider;
      case 'guardian':
        return this.guardianProvider;
      case 'nyt':
        return this.nytProvider;
      default:
        throw new Error(`Unsupported source: ${source}`);
    }
  }
}
