import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Category } from "src/category/category";
import { CategoryService } from "src/category/category.service";
import { Prompt } from "src/prompt/prompt";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Episode {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id?: number

  // I think the jarchiveid should only be used for episode and prompt creation
  // but there really shouldn't be a reason for the graphql api to access it
  // hence, not tagging it with graphql @field tag. 
  @Column()
  jArchiveId: string

  @Column()
  @Field(type => String)
  name: string

  @OneToMany(
    () => Prompt, 
    prompt => prompt.episode
  )
  @Field(type => [Prompt])
  prompts: Prompt[]

  @OneToMany(
    () => Category,
    category => category.episode
  )
  @Field(type => [Category])
  categories: Category[]
}