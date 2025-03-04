import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
export class LoginUserDto {
  @ApiProperty({ type: String, default: 'example@gmail.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ type: String, default: '12345678' })
  @IsString()
  password: string;
}
