import { InputType, Field } from "type-graphql";

@InputType()
export class RegisterCreds {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
