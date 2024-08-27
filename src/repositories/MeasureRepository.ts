import Measure from '@/entities/Measure';

export interface IFindByMonthMeasure {
  customer_code: string;
  measure_datetime: Date;
}
export type IFindByMonthMeasureResponse = Measure | null;

export interface IFindByIdMeasure {
  measure_uuid: string;
}
export type IFindByIdMeasureResponse = Measure | null;

export interface IListByCustomerCodeMeasure {
  customer_code: string;
  measure_type?: string;
}
export type IListByCustomerCodeMeasureResponse = Omit<Measure, 'customer_code' | 'value'>[];

export interface ICreateMeasure {
  measure: Measure;
}

export interface IConfirmMeasure {
  measure_uuid: string;
  value: number;
}

export interface IMeasureRepository {
  findByMonth: (data: IFindByMonthMeasure) => Promise<IFindByMonthMeasureResponse>;
  findById: (data: IFindByIdMeasure) => Promise<IFindByIdMeasureResponse>;
  listByCustomerCode: (data: IListByCustomerCodeMeasure) => Promise<IListByCustomerCodeMeasureResponse>;
  create: (data: ICreateMeasure) => Promise<void>;
  confirm: (data: IConfirmMeasure) => Promise<void>;
}