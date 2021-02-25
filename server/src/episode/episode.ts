import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}