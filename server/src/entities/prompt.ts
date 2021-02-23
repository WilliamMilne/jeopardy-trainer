import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { Episode } from "./episode";

@Entity()
export class Prompt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prompt: string;

  @Column()
  response: string;

  @OneToOne(() => Category)
  @JoinColumn()
  category: number;

  @OneToOne(() => Episode)
  @JoinColumn()
  episode: number;

  @Column()
  point_value: number;
}