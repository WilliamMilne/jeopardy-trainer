import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Clue } from "../clue/clue";
import { User } from "../user/user";

@Entity()
@ObjectType()
export class Response {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number

  @ManyToOne(() => User)
  @Field(type => User)
  user: User

  @ManyToOne(() => Clue)
  @Field(type => Clue)
  clue: Clue

  @Column()
  @Field(type => String)
  user_response: string

  @Column()
  @Field(type => Boolean)
  response_correct: boolean
}