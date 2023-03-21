import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, MinLength } from 'class-validator';
import { StatusEnum } from './status.enum';

@InputType()
export class TaskInput {
  @Field(() => ID, { nullable: false })
  projectId: string;

  @Field(() => ID, { nullable: false })
  id: number;

  @Field({ nullable: true })
  @MinLength(3)
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @MinLength(2)
  @IsOptional()
  type: string;

  @Field({ nullable: true })
  @IsEnum(StatusEnum)
  @IsOptional()
  status?: string;
}
