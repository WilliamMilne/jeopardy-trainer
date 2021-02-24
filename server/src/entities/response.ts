import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Prompt } from "./prompt";
import { User } from "./user";

@Entity()
@ObjectType()
export class Response {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number

  @ManyToOne(() => User)
  @Field(type => User)
  user: User

  @ManyToOne(() => Prompt)
  @Field(type => Prompt)
  prompt: Prompt

  @Column()
  @Field(type => String)
  user_response: string

  @Column()
  @Field(type => Boolean)
  response_correct: boolean
}