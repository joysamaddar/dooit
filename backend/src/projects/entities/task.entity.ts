import { Column } from 'typeorm';
import { StatusEnum } from '../dto/status.enum';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Task')
export class Task {
  constructor(id: number, name: string, type: string) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.status = StatusEnum.PENDING;
  }

  @Column()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  type: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  @Field()
  status: string;
}
