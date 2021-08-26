import { Department } from "../entities/Department";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class DepartmentResolver {
  @Mutation(() => Boolean)
  async addManager(@Arg("employeeId", () => Int) employeeId: number) {
    // await Department.insert()
    return true;
  }

  @Query(() => [Department])
  getCompanyDepartments(@Arg("companyId", () => Int) companyId: number) {
    return Department.find({ where: { companyId } });
  }

  @Mutation(() => Boolean)
  async createDepartment(
    @Arg("companyId", () => Int) companyId: number,
    @Arg("departmentName") name: string
  ) {
    const variables = {
      name,
      companyId,
    };
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Department)
      .values({
        ...variables,
      })
      .returning("*")
      .execute();
    const department = result.raw[0];

    return true;
  }
}
