import Measure from '@/entities/Measure';

export interface IFindByMonthMeasure {
  customer_code: string;
  date: Date;
}
export type IFindByMonthMeasureResponse = Measure | null;

export interface ICreateMeasure {
  measure: Measure;
}
export interface IMeasureRepository {
  findByMonth: (data: IFindByMonthMeasure) => Promise<IFindByMonthMeasureResponse>;
  create: (data: ICreateMeasure) => Promise<void>;
}