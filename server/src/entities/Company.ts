import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Employee } from "./Employee";

@ObjectType()
@Entity()
export class Company extends BaseEntity {
  // Info on register
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  companyName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  // Company info
  @Field(() => [Employee])
  @OneToMany(() => Employee, (e) => e.company)
  employees: Employee[];

  // Date info
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
