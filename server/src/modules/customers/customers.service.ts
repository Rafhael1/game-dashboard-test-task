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
    try {
      return this.sequelize.query(`
        INSERT INTO customers (name, email, address)
        VALUES ('${createCustomerDto.name}', '${createCustomerDto.email}', '${createCustomerDto.address}')
      `);
    }
    catch (error) {
      throw BadRequestException;
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      const data = (await this.sequelize.query(`
        UPDATE customers
        SET name = '${updateCustomerDto.name}',
        email = '${updateCustomerDto.email}',
        address = '${updateCustomerDto.address}'
        WHERE id = ${id}
      `))?.[0];

      return data;
    } catch (error) {
      throw BadRequestException;
    }
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
    try {
      return this.sequelize.query(`
        DELETE FROM customers
        WHERE id = ${id}
      `);
    } catch (error) {
      throw BadRequestException;
    }
  }
}
