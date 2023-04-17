import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { SequelizeModule } from '@nestjs/sequelize';


@Module({
  imports: [SequelizeModule.forFeature()],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
 