import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGameCategoryDto } from './dto/create-game-category.dto';
import { UpdateGameCategoryDto } from './dto/update-game-category.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class GameCategoriesService {
  constructor(
    private sequelize: Sequelize,
  ) {}
  async findAll() {
    try {
      const data = (await this.sequelize.query(`
        SELECT * FROM game_categories
      `))?.[0];

      return data;
    } catch (error) {
      throw BadRequestException;
    }
  }
}
