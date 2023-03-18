import { Column } from 'typeorm';
import { StatusEnum } from '../dto/status.enum';
import { v4 as uuid } from 'uuid';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Task')
export class Task {
  constructor(name: string, type: string) {
    this.id = uuid();
    this.name = name;
    this.type = type;
    this.status = StatusEnum.PENDING;
  }

  @Column()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  status: string;
}
