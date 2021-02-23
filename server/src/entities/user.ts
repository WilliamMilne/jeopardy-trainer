import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Response } from "./response"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  // @OneToMany(() => Response, response => response.user)
  // responses: Response[]
}