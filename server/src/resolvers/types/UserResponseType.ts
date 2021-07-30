import { Employee } from "../../entities/Employee";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Employee, { nullable: true })
  employee?: Employee;
}
