import { Table, Column, AutoIncrement, PrimaryKey, ForeignKey, Model } from 'sequelize-typescript';

@Table({ tableName: 'game_categories' })
export class GameCategories extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;
}