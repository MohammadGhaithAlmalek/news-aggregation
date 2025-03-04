import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserPreferencesDto } from './dto/update-user-preferences.dto';
@ApiTags('user')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('preferences')
  @UseGuards(JwtAuthGuard)
  async getPreferences(
    @Req() req: { user: { userId: number } },
  ): Promise<string[]> {
    return await this.usersService.getUserPrefernces(req.user.userId);
  }
  @Put('preferences')
  @UseGuards(JwtAuthGuard)
  async updatePreferences(
    @Body() updateUserPreferencesDto: UpdateUserPreferencesDto,
    @Req() req: { user: { userId: number } },
  ): Promise<string[]> {
    return this.usersService.updateUserPreferences(
      req.user.userId,
      updateUserPreferencesDto,
    );
  }
}
