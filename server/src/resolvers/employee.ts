import argon2 from "argon2";
import { MyContext } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";
import { validateRegister } from "../utils/validateRegister";
import { RegisterCreds } from "./types/RegisterCreds";
import { UserResponse } from "./types/UserResponseType";

@Resolver(Employee)
export class EmployeeResolver {
  @Query(() => String)
  hello() {
    return "yessir";
  }

  @Query(() => Employee, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    console.log(req.session.userId);
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    return Employee.findOne(req.session.userId);
  }

  @Query(() => [Employee])
  async employees() {
    const employees = await Employee.find();
    return employees;
  }

  @Query(() => [Employee])
  async getShifts(
    @Arg("id", () => Int) id: number,
    @Arg("dateTime", () => String) dateTime: string
  ) {
    const timeTime = new Date(dateTime);
    let endTimeTime = new Date(timeTime.getTime());
    endTimeTime.setHours(timeTime.getHours() + 176);

    const shifts = await getConnection()
      .getRepository(Employee)
      .createQueryBuilder("employee")
      .leftJoinAndSelect("employee.shifts", "shift")
      .where({
        departmentId: id,
        // "shift.startTime": MoreThanOrEqual(timeTime),
        // "shift.endTime": LessThanOrEqual(endTimeTime),
      })
      .getMany();

    shifts.forEach((employee) => {
      let deletionarr: number[] = [];
      employee.shifts.forEach((shift, index) => {
        if (shift.startTime < timeTime) {
          deletionarr.push(index);
        } else if (shift.endTime > endTimeTime) {
          deletionarr.push(index);
        }
      });

      deletionarr.forEach((index) => ((employee.shifts[index].id as any) = -1));
    });

    return shifts;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") inputs: RegisterCreds,
    @Ctx() { req }: MyContext
  ) {
    const errors = validateRegister(inputs);
    if (errors !== "") {
      return { errors };
    }

    const hashedPassword = await argon2.hash(inputs.password);

    let employee;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Employee)
        .values({
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          email: inputs.email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();
      employee = result.raw[0];
    } catch (err) {
      throw new Error(err);
    }

    req.session.userId = employee.id;
    return employee;
  }

  @Mutation(() => Boolean)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ) {
    const employee = await Employee.findOne({
      where: {
        email: email,
      },
    });

    if (!employee) {
      return false;
    }

    const valid = await argon2.verify(employee.password, password);
    if (!valid) {
      return false;
    }
    req.session.userId = employee.id;
    return true;
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    req.session.destroy(() => {
      try {
        res.clearCookie("qid");
      } catch {}
    });
    return true;
  }

  @Mutation(() => UserResponse)
  async giveTitle(
    @Arg("title", () => String) title: string,
    @Arg("id", () => Int) id: number
  ) {
    const employee = await Employee.findOne(id);
    if (employee === undefined) {
      let errors = [
        {
          field: "id",
          message: "invalid employee id",
        },
      ];
      return { errors };
    }

    await getConnection()
      .createQueryBuilder()
      .update(Employee)
      .set({ title })
      .where("id = :id", { id })
      .execute();

    return true;
  }

  @Mutation(() => UserResponse)
  async setDepartmentId(
    @Arg("id", () => Int) id: number,
    @Arg("employeeId", () => Int) employeeId: number
  ) {
    const employee = await Employee.findOne({ where: { id: employeeId } });
    if (employee === undefined) {
      let errors = [
        {
          field: "id",
          message: "invalid employee id",
        },
      ];
      return { errors };
    }

    await getConnection()
      .createQueryBuilder()
      .update(Employee)
      .set({ departmentId: id })
      .where("id = :employeeId", { employeeId })
      .execute();

    return true;
  }
}
