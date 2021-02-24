import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category";
import { Episode } from "../episode/episode";

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
  @Field(type => Category)
  category: Category;

  @OneToOne(() => Episode)
  @JoinColumn()
  @Field(type => Episode)
  episode: Episode;

  @Column()
  @Field(type => Int)
  point_value: number;
}