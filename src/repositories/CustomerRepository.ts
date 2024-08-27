import { Customer } from '@/entities/Customer';

export interface IFindByIdCustomer {
  customerId: string;
}
export type IFindByIdCustomerResponse = Customer | null;

export interface ICreateCustomer {
  customer: Customer;
}

export interface ICustomerRepository {
  findById: (data: IFindByIdCustomer) => Promise<IFindByIdCustomerResponse>;
  create: (data: ICreateCustomer) => Promise<void>;
}