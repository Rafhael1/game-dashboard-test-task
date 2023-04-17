import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameCategoriesService } from './game-categories.service';
import { CreateGameCategoryDto } from './dto/create-game-category.dto';
import { UpdateGameCategoryDto } from './dto/update-game-category.dto';

@Controller('game-categories')
export class GameCategoriesController {
  constructor(private readonly gameCategoriesService: GameCategoriesService) {}

  @Get()
  findAll() {
    return this.gameCategoriesService.findAll();
  }
  
}
