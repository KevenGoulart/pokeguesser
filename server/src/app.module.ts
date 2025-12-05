import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LeaderboardModule } from './modules/leaderboard/leaderboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LeaderboardModule,
  ],
})
export class AppModule {}
