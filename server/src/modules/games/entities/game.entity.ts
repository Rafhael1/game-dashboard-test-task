import { Table, Column, AutoIncrement, PrimaryKey, ForeignKey, Model } from 'sequelize-typescript';
import { GameCategories } from 'src/modules/game-categories/entities/game-category.entity';

@Table({ tableName: 'games', })
export class Games extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @ForeignKey(() => GameCategories)
  @Column
  category: string;

  @Column
  created_at: string;
}