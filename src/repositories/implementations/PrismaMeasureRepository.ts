import { prisma } from '@/prisma';

import { IConfirmMeasure, ICreateMeasure, IFindByIdMeasure, IFindByIdMeasureResponse, IFindByMonthMeasure, IFindByMonthMeasureResponse, IMeasureRepository } from '@/repositories/MeasureRepository';

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
          gte: genInitialDate(),
          lte: genFinalDate()
        }
      }
    });

    return measure;

  }

  async findById(data: IFindByIdMeasure): Promise<IFindByIdMeasureResponse> {

    const measure = await prisma.measure.findFirst({
      where: {
        id: data.measureId
      }
    });

    return measure;

  }

  async create(data: ICreateMeasure): Promise<void> {

    await prisma.measure.create({
      data: data.measure
    });

  }

  async confirm(data: IConfirmMeasure): Promise<void> {

    await prisma.measure.update({
      where: {
        id: data.measureId
      },
      data: {
        has_confirmed: true,
        value: data.value
      }
    });

  }
}