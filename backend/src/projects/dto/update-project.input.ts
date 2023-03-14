import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, MinLength } from 'class-validator';

@InputType()
export class UpdateProjectInput {
  @Field(() => ID, { nullable: false })
  id: string;

  @Field({ nullable: true })
  @MinLength(3)
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @MinLength(3)
  @IsOptional()
  description?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  tags?: string[];
}
