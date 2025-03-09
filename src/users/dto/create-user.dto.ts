import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsString } from 'class-validator';
import { PreferredSourcesEnum } from '../enums/user-preferences.enum';
export class CreateUserDto {
  @ApiProperty({ type: String, default: 'example@gmail.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ type: String, default: '12345678' })
  @IsString()
  password: string;
  @ApiProperty({
    example: ['bbc-news', 'cbc-news', 'nyt', 'guardian'],
  })
  @IsArray()
  @IsEnum(PreferredSourcesEnum, { each: true })
  preferredSources: PreferredSourcesEnum[];
}
