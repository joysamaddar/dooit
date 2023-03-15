import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class Project {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: [] })
  tags?: string[];

  @Column(() => Task, { array: true })
  tasks?: Task[];
}
