import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { Episode } from "./episode";

@Entity()
@ObjectType()
export class Prompt {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field(type => String)
  prompt: string;

  @Column()
  @Field(type => String)
  response: string;

  @OneToOne(() => Category)
  @JoinColumn()
  @Field(type => Int)
  category: number;

  @OneToOne(() => Episode)
  @JoinColumn()
  @Field(type => Int)
  episode: number;

  @Column()
  @Field(type => Int)
  point_value: number;
}