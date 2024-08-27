import { randomUUID } from 'node:crypto';

export class Customer {

  public id: string;

  constructor(id?: string) {
    this.id = id ?? randomUUID();
  }
  
}