import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class NewEpisodeInput {
  @Field(type => String)
  name: string

  @Field(type => Int)
  jArchiveId: number
}