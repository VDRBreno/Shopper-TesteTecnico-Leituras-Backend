import { randomUUID } from 'node:crypto';

export default class Measure {
  
  public id: string;
  public date: Date;
  public type: string;
  public has_confirmed: boolean;
  public image_url: string;
  public customer_code: string;
  public value: number;

  constructor(props: Omit<Measure, 'id'>, id?: string) {
    this.id = id ?? randomUUID();
    this.date = props.date;
    this.type = props.type;
    this.has_confirmed = props.has_confirmed;
    this.image_url = props.image_url;
    this.customer_code = props.customer_code;
    this.value = props.value;
  }

}