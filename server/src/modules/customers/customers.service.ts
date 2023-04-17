import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CustomersService {
  constructor(
    private sequelize: Sequelize,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  async findAll() {
    try {
      const data = (await this.sequelize.query(`
        SELECT * FROM customers
      `))?.[0];

      return data;
    } catch (error) {
      throw BadRequestException;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
