import { Body, Controller, Get, Post } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  async getLeaderboard() {
    const data = await this.leaderboardService.getLeaderboard();
    return data;
  }

  @Post()
  addToLeaderboard(@Body() body: { username: string; score: number }) {
    return this.leaderboardService.addToLeaderboard(body.username, body.score);
  }
}
