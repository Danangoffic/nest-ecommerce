import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

/**
 * Update Customer Data Transfer Object (DTO).
 * This DTO is used to update existing customer records.
 */
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    id: string;
    lastName?: string;
    firstName?: string;
    email?: string;
    phone?: string;
    birthDate?: Date;
    isActive?: boolean;
}