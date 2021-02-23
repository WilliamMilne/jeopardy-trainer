import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Prompt } from "./prompt";
import { User } from "./user";

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number

  // @Column()
  // @ManyToOne(() => User, user => user.responses)
  // user: User

  @Column()
  @ManyToOne(() => Prompt)
  prompt: number

  @Column()
  user_response: string

  @Column()
  response_correct: boolean
}