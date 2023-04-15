import { Sequelize } from 'sequelize-typescript';
import { Customers } from '../modules/customers/entities/customers.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '../../yolotest.db',
        sync: { force: true },
      });
      sequelize.addModels([Customers]);
      await sequelize.sync();
      return sequelize;
    },
  },
];