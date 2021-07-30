import { Arg, Float, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { Shift } from "../entities/Shift";

@Resolver(Shift)
export class ShiftResolver {
  @Query(() => [Shift])
  async scheduledShifts(
    @Arg("id", () => Int) id: number,
    @Arg("dateTime", () => String) dateTime: string
  ) {
    const timeTime = new Date(dateTime);
    let endTimeTime = new Date(timeTime.getTime());
    endTimeTime.setHours(timeTime.getHours() + 176);

    const shifts = await getConnection()
      .getRepository(Shift)
      .createQueryBuilder("s")
      .leftJoinAndSelect("s.employee", "employee")
      .where({
        departmentId: id,
        startTime: MoreThanOrEqual(timeTime),
        endTime: LessThanOrEqual(endTimeTime),
      })
      .orderBy(`"employeeId"`)
      .getMany();
    return shifts;
  }

  @Mutation(() => Boolean)
  async addShift(
    @Arg("employeeId", () => Int) employeeId: number,
    @Arg("departmentId", () => Int) departmentId: number,
    @Arg("dateTime", () => String) dateTime: string,
    @Arg("length", () => Float) length: number,
    @Arg("isHoliday", () => Boolean) isHoliday: boolean
  ) {
    console.log(dateTime);
    // Input dateTime as a string in format 'August 19, 1975 23:15'
    const startTime = new Date(dateTime);
    // Init endTime to startTime
    let endTime = new Date(startTime.getTime());
    // Input length is taken as a float in format 8.5, 4.0, 4.5, etc.
    // Add hours, then minutes
    endTime.setHours(startTime.getHours() + Math.floor(length));
    endTime.setMinutes(startTime.getMinutes() + (length % 1) * 60);
    console.log(endTime);

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Shift)
      .values({
        employeeId,
        departmentId,
        startTime,
        endTime,
        isHoliday,
      })
      .returning("*")
      .execute();

    return true;
  }
}
