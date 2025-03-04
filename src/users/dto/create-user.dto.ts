import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString } from 'class-validator';
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
  @IsString({ each: true })
  preferredSources: string[];
}
