import { ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}