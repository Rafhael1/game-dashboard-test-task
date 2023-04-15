import { Customers } from './../modules/customers/entities/customers.entity';

export const customersProviders = [
  {
    provide: 'CUSTOMERS_REPOSITORY',
    useValue: Customers,
  },
];