import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class NewFeedbackInput {
    @Field(type => String)
    comment: string;

    @Field(type => ID)
    clueId: number

    @Field(type => ID)
    userId: number
}