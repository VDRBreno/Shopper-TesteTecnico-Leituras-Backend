import Measure from '@/entities/Measure';

export interface IFindByMonthMeasure {
  customer_code: string;
  date: Date;
}
export type IFindByMonthMeasureResponse = Measure | null;

export interface IFindByIdMeasure {
  measureId: string;
}
export type IFindByIdMeasureResponse = Measure | null;

export interface ICreateMeasure {
  measure: Measure;
}

export interface IConfirmMeasure {
  measureId: string;
  value: number;
}

export interface IMeasureRepository {
  findByMonth: (data: IFindByMonthMeasure) => Promise<IFindByMonthMeasureResponse>;
  findById: (data: IFindByIdMeasure) => Promise<IFindByIdMeasureResponse>;
  create: (data: ICreateMeasure) => Promise<void>;
  confirm: (data: IConfirmMeasure) => Promise<void>;
}