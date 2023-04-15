import { Injectable } from '@nestjs/common';
import { CreateGameCategoryDto } from './dto/create-game-category.dto';
import { UpdateGameCategoryDto } from './dto/update-game-category.dto';

@Injectable()
export class GameCategoriesService {
  create(createGameCategoryDto: CreateGameCategoryDto) {
    return 'This action adds a new gameCategory';
  }

  findAll() {
    return `This action returns all gameCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gameCategory`;
  }

  update(id: number, updateGameCategoryDto: UpdateGameCategoryDto) {
    return `This action updates a #${id} gameCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} gameCategory`;
  }
}
