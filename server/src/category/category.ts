import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number

  @Column()
  @Field(type => String)
  name: string
}