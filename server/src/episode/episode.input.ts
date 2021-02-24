import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class NewEpisodeInput {
  @Field(type => Int)
  id: number

  @Field(type => String)
  name: string
}