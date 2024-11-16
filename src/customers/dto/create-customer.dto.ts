/**
 * Create Customer Data Transfer Object (DTO).
 * This DTO is used to create new customer records.
 */
export class CreateCustomerDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate?: Date;
}
