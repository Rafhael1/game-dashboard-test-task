import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class GamesService {
  constructor(
    private sequelize: Sequelize,
  ) {}

  async create(createGameDto: CreateGameDto) {
    try {
      const category: any = (await this.sequelize.query(`
        SELECT id FROM game_categories WHERE name = '${createGameDto.category}';
      `))?.[0][0];

      if(!category) throw BadRequestException;

      return this.sequelize.query(`
        INSERT INTO games (name, category_id)
        VALUES ('${createGameDto.game_name}', ${category.id});
      `);
    }
    catch (error) {
      throw new BadRequestException;
    }
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
      throw new BadRequestException;
    }
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    try {
      const category: any = (await this.sequelize.query(`
        SELECT id FROM game_categories WHERE name = '${updateGameDto.category}';
      `))?.[0][0];

      if(!category) throw BadRequestException;

      return this.sequelize.query(`
        UPDATE games
        SET name = '${updateGameDto.game_name}',
        category_id = ${category.id}
        WHERE id = ${id}
      `);
    }
    catch (error) {
      throw new BadRequestException;
    }
  }

  async remove(id: number) {
    try {
      return this.sequelize.query(`
        DELETE FROM games WHERE id = ${id};
      `);
    }
    catch (error) {
      throw new BadRequestException;
    }
  }
}
