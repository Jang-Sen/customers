import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  // 등록
  async createCustomer(dto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.repository.create(dto);

    return await this.repository.save(customer);
  }

  async getCustomer(customerId: string): Promise<Customer> {
    const customer = await this.repository.findOneBy({ id: customerId });

    if (!customer) {
      throw new NotFoundException('Customer Not Found');
    }

    return customer;
  }
}
