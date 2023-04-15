import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customers } from './entities/customers.entity';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class CustomersService {
  constructor(
    @Inject('CUSTOMERS_REPOSITORY')
    private customersRepository: Repository<Customers>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  findAll() {
    return this.customersRepository.findAll();
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
