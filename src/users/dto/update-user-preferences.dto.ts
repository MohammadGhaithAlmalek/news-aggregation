import { IsArray, IsEnum } from 'class-validator';
import { PreferredSourcesEnum } from '../enums/user-preferences.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPreferencesDto {
  @ApiProperty({
    type: [String],
    default: ['bbc-news', 'cbc-news', 'nyt', 'guardian'],
  })
  @IsArray()
  @IsEnum(PreferredSourcesEnum, { each: true })
  preferredSources: string[];
}
