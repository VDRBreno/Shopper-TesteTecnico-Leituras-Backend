import { prisma } from '@/prisma';

import { ICreateMeasure, IFindByMonthMeasure, IFindByMonthMeasureResponse, IMeasureRepository } from '../MeasureRepository';

export class PrismaMeasureRepository implements IMeasureRepository {

  async findByMonth(data: IFindByMonthMeasure): Promise<IFindByMonthMeasureResponse> {

    const date = data.date;

    function genInitialDate() {
      const month = date.getMonth()+1;
      const year = date.getFullYear();
      return new Date(`${year}-${month}-01`);
    }
    function genFinalDate() {
      const month = date.getMonth()+1;
      const year = date.getFullYear();

      const dateNextMonth = new Date(`${year}-${month+1}-01`);
      const newDate = new Date(dateNextMonth).setDate(new Date(dateNextMonth).getDate() - 1);

      return new Date(newDate);
    }

    const measure = await prisma.measure.findFirst({
      where: {
        customer_code: data.customer_code,
        date: {
          in: [genInitialDate(), genFinalDate()]
        }
      }
    });

    return measure;

  }

  async create(data: ICreateMeasure) {

    await prisma.measure.create({
      data: data.measure
    });

  }
}