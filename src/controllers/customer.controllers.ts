// customers/customers.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from '../services';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Customer } from '../db/entities'

@ApiTags('Customers')
@ApiBearerAuth()
@Controller('customers')
@UseGuards(AuthGuard('jwt'))
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Successfully fetched customers', type: Object })
  async getAllCustomers() {
    return this.customersService.getAllCustomers();
  }

  @Post()
  @ApiBody({type: Customer})
  @ApiResponse({ status: 200, description: 'Successfully added customers', type: Customer })
  async addCustomer(@Body() body: { name: string }) {
    const { name } = body;
    return this.customersService.addCustomer(name);
  }

  @Put(':id')
  @ApiBody({type: Customer})
  @ApiResponse({ status: 200, description: 'Successfully updated customers', type: Customer })
  async updateCustomer(@Param('id') id: number, @Body() body: { name: string }) {
    const { name } = body;
    return this.customersService.updateCustomer(id, name);
  }

  @Delete(':id')
  @ApiBody({type: Customer})
  @ApiResponse({ status: 200, description: 'Successfully deteted customers', type: Customer })
  async deleteCustomer(@Param('id') id: number) {
    await this.customersService.deleteCustomer(id);
    return { message: 'Customer deleted successfully' };
  }
}
