import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameCategoriesService } from './game-categories.service';
import { CreateGameCategoryDto } from './dto/create-game-category.dto';
import { UpdateGameCategoryDto } from './dto/update-game-category.dto';

@Controller('game-categories')
export class GameCategoriesController {
  constructor(private readonly gameCategoriesService: GameCategoriesService) {}

  @Post()
  create(@Body() createGameCategoryDto: CreateGameCategoryDto) {
    return this.gameCategoriesService.create(createGameCategoryDto);
  }

  @Get()
  findAll() {
    return this.gameCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameCategoryDto: UpdateGameCategoryDto) {
    return this.gameCategoriesService.update(+id, updateGameCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameCategoriesService.remove(+id);
  }
}
