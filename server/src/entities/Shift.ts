import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Employee } from "./Employee";

@ObjectType()
@Entity()
export class Shift extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  departmentId: number;

  @Field(() => ID)
  @Column()
  employeeId: number;

  @Field(() => Employee)
  @ManyToOne(() => Employee, (employee) => employee.shifts)
  employee: Employee;

  @Field(() => Date)
  @Column()
  startTime: Date;

  @Field()
  @Column()
  endTime: Date;

  @Field()
  @Column()
  isHoliday: Boolean;

  // Date info
  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
