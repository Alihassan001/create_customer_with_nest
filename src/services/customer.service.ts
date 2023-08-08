// customers/customers.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../db/entities';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async addCustomer(name: string): Promise<Customer> {
    const newCustomer = this.customerRepository.create({ name });
    return this.customerRepository.save(newCustomer);
  }

  async updateCustomer(id: number, name: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({where: {id}});
    if (!customer) {
      throw new Error('Customer not found');
    }

    customer.name = name;
    return this.customerRepository.save(customer);
  }

  async deleteCustomer(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
