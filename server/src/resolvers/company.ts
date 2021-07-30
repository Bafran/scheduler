import { Company } from "src/entities/Company";
import { Arg, Mutation, ObjectType } from "type-graphql";
import { BaseEntity, Entity, getConnection } from "typeorm";
import { CompanyRegisterCreds } from "./types/CompanyRegisterCreds";
import argon2 from "argon2";

@ObjectType()
@Entity()
export class CompanyResolver extends BaseEntity {
  @Mutation(() => Company)
  async registerCompany(@Arg("options") inputs: CompanyRegisterCreds) {
    const hashedPassword = await argon2.hash(inputs.password);

    let employee;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Company)
        .values({
          companyName: inputs.companyName,
          email: inputs.email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();
      employee = result.raw[0];
    } catch (err) {
      throw new Error(err);
    }

    return employee;
  }
}
