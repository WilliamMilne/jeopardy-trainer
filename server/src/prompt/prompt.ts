import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category";
import { Episode } from "../episode/episode";

@Entity()
@ObjectType()
export class Prompt {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id?: number;

  @Column()
  @Field(type => String)
  prompt: string;

  @Column()
  @Field(type => String)
  response: string;

  @ManyToOne(() => Category)
  @JoinColumn()
  @Field(type => Category)
  category: Category;

  @ManyToOne(() => Episode)
  @JoinColumn()
  @Field(type => Episode)
  episode: Episode;

  @Column()
  @Field(type => Int)
  point_value: number;
}