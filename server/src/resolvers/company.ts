import { Company } from "../entities/Company";
import { Arg, Ctx, Int, Mutation, ObjectType, Query } from "type-graphql";
import { Any, BaseEntity, Entity, getConnection } from "typeorm";
import { CompanyRegisterCreds } from "./types/CompanyRegisterCreds";
import argon2 from "argon2";
import { Employee } from "../entities/Employee";
import { MyContext } from "src/types";

@ObjectType()
@Entity()
export class CompanyResolver extends BaseEntity {
  @Query(() => [Company])
  async fetchAllCompanies() {
    return Company.find();
  }

  @Query(() => Company, { nullable: true })
  async meCompany(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.companyId) {
      return null;
    }

    return Company.findOne(req.session.companyId);
  }

  @Mutation(() => Company)
  async registerCompany(@Arg("options") inputs: CompanyRegisterCreds) {
    const hashedPassword = await argon2.hash(inputs.password);

    let company;
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
      company = result.raw[0];
    } catch (err) {
      throw new Error(err);
    }

    return company;
  }

  @Mutation(() => Boolean)
  async companyLogin(
    @Arg("companyName") companyName: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ) {
    const company = await Company.findOne({
      where: {
        companyName,
      },
    });

    if (!company) {
      return false;
    }

    const valid = await argon2.verify(company.password, password);
    if (!valid) {
      return false;
    }

    req.session.companyId = company.id;
    return true;
  }

  @Mutation(() => Boolean)
  async insertEmployee(@Arg("employeeId") employeeId: number) {
    await Company.insert({ employees: employeeId.toString });
  }

  @Query(() => [Employee])
  async fetchCompanyEmployees(@Arg("companyId", () => Int) companyId: number) {
    return Employee.find({ where: { companyId } });
  }
}
