// customers/customers.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from '../services';

@Controller('customers')
@UseGuards(AuthGuard('jwt'))
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async getAllCustomers() {
    return this.customersService.getAllCustomers();
  }

  @Post()
  async addCustomer(@Body() body: { name: string }) {
    const { name } = body;
    return this.customersService.addCustomer(name);
  }

  @Put(':id')
  async updateCustomer(@Param('id') id: number, @Body() body: { name: string }) {
    const { name } = body;
    return this.customersService.updateCustomer(id, name);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: number) {
    await this.customersService.deleteCustomer(id);
    return { message: 'Customer deleted successfully' };
  }
}
