import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Clue } from "../clue/clue";


@Entity()
@ObjectType()
export class Feedback {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number

    @ManyToOne(() => Clue)
    @JoinColumn()
    @Field(type => Int)
    clue_id: number
    
    @Column()
    @Field(type => String)
    comment: string

    @Column()
    @Field(type => Boolean)
    resolved: boolean
}