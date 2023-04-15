import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { customersProviders } from 'src/providers/customers.provider';
import { DatabaseModule } from 'src/providers/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customers } from './entities/customers.entity';


@Module({
  imports: [SequelizeModule.forFeature([Customers])],
  controllers: [CustomersController],
  providers: [CustomersService, ...customersProviders]
})
export class CustomersModule {}
 