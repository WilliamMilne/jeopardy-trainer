import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class NewCategoryInput {
  @Field(type => String)
  name: string

  @Field(type => String)
  jArchiveEpisodeId: string
}