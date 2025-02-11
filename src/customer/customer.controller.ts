import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Customer } from './entities/customer.entity';

const GET_CUSTOMER = 'get_customer';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() dto: CreateCustomerDto) {
    return await this.customerService.createCustomer(dto);
  }

  @MessagePattern(GET_CUSTOMER)
  async handleGetCustomer(
    @Payload() data: { customerId: string },
  ): Promise<Customer> {
    const { customerId } = data;

    return await this.customerService.getCustomer(customerId);
  }
}
