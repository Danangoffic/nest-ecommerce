import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

/**
 * Service to handle customer layer
 */
@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository:
      Repository<Customer>,
  ) { }

  /**
   * Create a new customer.
   * @param createCustomerDto The data to create a new customer.
   * @returns The created customer.
   */
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    console.log("creating customer data..",createCustomerDto);    
    return await this.customerRepository.save(createCustomerDto);
  }

  async findAll(): Promise<Customer[]>{
    console.log("getting all customers..");
    const customers = await this.customerRepository.find({order: {id: "DESC"}});
    return customers;
  }

  async findOne(id: number): Promise<Customer> {
    console.log("getting customer by id..");
    return await this.customerRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    console.log("updating customer data..", updateCustomerDto);
    const customerExist = await this.findOne(id);
    if (customerExist != null) {
      const updatedCustomer = this.customerRepository.update({ id: id }, {
        // Map the DTO properties to the customer entity properties
        firstName: updateCustomerDto.firstName,
        lastName: updateCustomerDto.lastName,
        phone: updateCustomerDto.phone,
        birthDate: updateCustomerDto.birthDate,
        email: updateCustomerDto.email,
        isActive: updateCustomerDto.isActive
      });
      console.log(`Successfully update customer with id ${id}`);
      return updatedCustomer;
    }
    console.log("Customer not found");
    return null;
  }

  async remove(id: number) {
    console.log("deleting customer data..");
    const deleteCustomer = await this.customerRepository.delete({ id: id });
    return deleteCustomer.affected > 0;
  }
}
