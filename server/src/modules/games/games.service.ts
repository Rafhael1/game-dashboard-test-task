import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class GamesService {
  constructor(
    private sequelize: Sequelize,
  ) {}

  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
  }

  async findAll() {
    try {
      const data = (await this.sequelize.query(`
        SELECT
            g.id,
            g.name as game_name,
            g.createdAt,
            gc.name as category
        FROM games g
        LEFT JOIN game_categories gc ON g.category_id = gc.id;
      `))?.[0];

      return data;
    } catch (error) {
      throw BadRequestException;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
