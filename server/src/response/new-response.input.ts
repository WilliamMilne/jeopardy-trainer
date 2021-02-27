import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class NewResponseInput {
  // the ID of the clue they're responding to
  @Field(type => ID)
  clueId: number

  @Field(type => ID)
  userId: number

  @Field(type => String)
  user_response: string
}