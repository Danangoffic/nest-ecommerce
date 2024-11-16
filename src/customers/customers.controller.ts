import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Response } from 'express';

@Controller('api/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto, @Res() res: Response) {
    console.log("Controller customer create customer");
    const create = await this.customersService.create(createCustomerDto);
    if(create){
      return res.status(200).json({
        data: create, 
        status: "success"
      });
    }
    return res.status(400).json({
      data: null, 
      status: "failed"
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    return res.status(200).json({
      data: await this.customersService.findAll(), 
      status: "success"
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.customersService.findOne(+id);
    if(data != null){
      return res.status(200).json({
        data: data, 
        status: "success"
      });
    }
    return res.status(404).json({
      data: null, 
      status: "Not found"
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto, @Res() res: Response) {
    const responseUpdate = await this.customersService.update(+id, updateCustomerDto);
    if(responseUpdate != null){
      return res.status(200).json({
        data: responseUpdate, 
        status: "success"
      });
    }
    return res.status(400).json({
      data: null, 
      status: "failed"
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Res() res: Response) {
    const deleteCustomer = await this.customersService.remove(+id);
    if(deleteCustomer){
      return res.status(200).json({
        data: null, 
        status: "success"
      });
    }
    return res.status(400).json({
      data: null, 
      status: "failed"
    });
  }
}
