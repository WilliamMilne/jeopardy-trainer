import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NewFeedbackInput {
    @Field(type => String)
    comment: string
}