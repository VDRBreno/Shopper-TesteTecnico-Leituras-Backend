import { prisma } from '@/prisma';

import { IConfirmMeasure, ICreateMeasure, IFindByIdMeasure, IFindByIdMeasureResponse, IFindByMonthMeasure, IFindByMonthMeasureResponse, IListByCustomerCodeMeasure, IListByCustomerCodeMeasureResponse, IMeasureRepository } from '@/repositories/MeasureRepository';

export class PrismaMeasureRepository implements IMeasureRepository {

  async findByMonth(data: IFindByMonthMeasure): Promise<IFindByMonthMeasureResponse> {

    const date = data.measure_datetime;

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
        measure_datetime: {
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
        measure_uuid: data.measure_uuid
      }
    });

    return measure;

  }

  async listByCustomerCode(data: IListByCustomerCodeMeasure): Promise<IListByCustomerCodeMeasureResponse> {

    const measures = await prisma.measure.findMany({
      where: {
        customer_code: data.customer_code,
        measure_type: data.measure_type
      },
      select: {
        measure_uuid: true,
        measure_datetime: true,
        measure_type: true,
        has_confirmed: true,
        image_url: true
      }
    });

    return measures;

  }

  async create(data: ICreateMeasure): Promise<void> {

    await prisma.measure.create({
      data: data.measure
    });

  }

  async confirm(data: IConfirmMeasure): Promise<void> {

    await prisma.measure.update({
      where: {
        measure_uuid: data.measure_uuid
      },
      data: {
        has_confirmed: true,
        value: data.value
      }
    });

  }
}