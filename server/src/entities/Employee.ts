import { Field, Float, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Company } from "./Company";
import { Shift } from "./Shift";

@ObjectType()
@Entity()
export class Employee extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  // Enter when registering
  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  // Send a request to the company
  // Manually verify request
  // Following information entered by manager
  @Field(() => Float, { nullable: true })
  @Column({ nullable: true })
  payRate: number;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  companyId: string;

  @Field(() => ID, { nullable: true })
  @ManyToOne(() => Company, (c) => c.employees)
  company: Company;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  title: string;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  departmentId: number;

  @Field(() => [Shift])
  @OneToMany(() => Shift, (shift) => shift.employee)
  shifts: Shift[];

  // User account information
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
