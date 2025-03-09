import {
  Controller,
  Get,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './services/news.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { UsersService } from 'src/users/users.service';
import { seconds, Throttle } from '@nestjs/throttler';
@ApiTags('news')
@ApiBearerAuth()
@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private usersService: UsersService,
  ) {}

  @Get()
  @Throttle({ short: { ttl: seconds(30), limit: 3 } })
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'category', required: false })
  async getNews(
    @Req() req: { user: { userId: number } },
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    const user = await this.usersService.findById(req.user.userId);

    if (!user.preferredSources || user.preferredSources.length === 0) {
      throw new UnauthorizedException('User has no preferred sources.');
    }

    return await this.newsService.getNews(
      user.preferredSources,
      search,
      category,
    );
  }
}
