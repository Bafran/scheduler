import { InputType, Field } from "type-graphql";

@InputType()
export class CompanyRegisterCreds {
  @Field()
  companyName: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
