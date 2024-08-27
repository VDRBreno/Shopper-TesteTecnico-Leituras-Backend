import { prisma } from '@/prisma';

import { ICreateCustomer, ICustomerRepository, IFindByIdCustomer, IFindByIdCustomerResponse } from '@/repositories/CustomerRepository';

export class PrismaCustomerRepository implements ICustomerRepository {

  async findById(data: IFindByIdCustomer): Promise<IFindByIdCustomerResponse> {

    const customer = await prisma.customer.findFirst({
      where: {
        id: data.customerId
      }
    });

    return customer;

  }
  
  async create(data: ICreateCustomer) {

    await prisma.customer.create({
      data: data.customer
    });

  }

}