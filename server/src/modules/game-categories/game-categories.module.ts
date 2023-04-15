import { Module } from '@nestjs/common';
import { GameCategoriesService } from './game-categories.service';
import { GameCategoriesController } from './game-categories.controller';

@Module({
  controllers: [GameCategoriesController],
  providers: [GameCategoriesService]
})
export class GameCategoriesModule {}
