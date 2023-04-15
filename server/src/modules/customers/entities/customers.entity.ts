import { Table, Column, AutoIncrement, PrimaryKey, Model } from 'sequelize-typescript';

@Table({ tableName: 'customers' })
export class Customers extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  address: string;
}