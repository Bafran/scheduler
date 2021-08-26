import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./Employee";

@ObjectType()
@Entity()
export class Department extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  companyId: number;

  @Field(() => [Employee], { nullable: true })
  @OneToMany(() => Employee, (e) => e.company, { nullable: true })
  managers: Employee[];

  @Field(() => [Employee], { nullable: true })
  @OneToMany(() => Employee, (e) => e.company, { nullable: true })
  employees: Employee[];
}
