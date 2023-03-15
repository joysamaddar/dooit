import { Column } from 'typeorm';
import { StatusEnum } from '../dto/status.enum';
import { v4 as uuid } from 'uuid';

export class Task {
  constructor(name: string, type: string) {
    this.id = uuid();
    this.name = name;
    this.type = type;
    this.status = StatusEnum.PENDING;
  }

  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  status: string;
}
