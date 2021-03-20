import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Clue } from "../clue/clue";
import { User } from "../user/user";


@Entity()
@ObjectType()
export class Feedback {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number

    @ManyToOne(() => Clue)
    @JoinColumn()
    @Field(type => Clue)
    clue: Clue
    
    @Column()
    @Field(type => String)
    comment: string

    @Column()
    @Field(type => Boolean)
    resolved: boolean

    @ManyToOne(() => User)
    @Field(type => User)
    user: User
}