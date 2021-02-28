import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Episode } from "src/episode/episode";
import { Clue } from "src/clue/clue";
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

  @OneToMany(() => Clue, clue => clue.category)
  @Field(type=>[Clue])
  clues: Clue[]

  @ManyToOne(() => Episode)
  @Field(type => Episode)
  episode: Episode
}