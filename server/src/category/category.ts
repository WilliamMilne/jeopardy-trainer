import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Episode } from "src/episode/episode";
import { Prompt } from "src/prompt/prompt";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number

  @Column()
  @Field(type => String)
  name: string

  @OneToMany(() => Prompt, prompt => prompt.category)
  @Field(type=>[Prompt])
  prompts: Prompt[]

  @ManyToOne(() => Episode)
  @Field(type => Episode)
  episode: Episode
}