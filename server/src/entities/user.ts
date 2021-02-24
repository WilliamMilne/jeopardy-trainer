import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Response } from "./response"

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number

  @Column()
  @Field(type => String)
  name: string
}