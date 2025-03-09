import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyService {
  constructor(private readonly configService: ConfigService) {}

  getApiKey(source: string): string {
    const apiKey = this.configService.get<string>(source);
    if (!apiKey) {
      throw new UnauthorizedException(`Missing ${source} API key`);
    }
    return apiKey;
  }
}
