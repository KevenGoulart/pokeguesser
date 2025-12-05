import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  getLeaderboard() {
    return this.prisma.leaderboard.findMany({
      orderBy: {
        score: 'desc',
      },
      take: 10,
    });
  }

  async addToLeaderboard(username: string, score: number) {
    const existingUser = await this.prisma.leaderboard.findUnique({
      where: { username },
    });

    if (existingUser) {
      if (score > existingUser.score) {
        return this.prisma.leaderboard.update({
          where: { username },
          data: { score },
        });
      }

      return existingUser;
    }

    return this.prisma.leaderboard.create({
      data: {
        username,
        score,
      },
    });
  }
}
