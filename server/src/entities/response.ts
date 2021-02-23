import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Prompt } from "./prompt";
import { User } from "./user";

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @ManyToOne(() => User)
  user: number

  @Column()
  @ManyToOne(() => Prompt)
  prompt: number

  @Column()
  user_response: string

  @Column()
  response_correct: boolean
}