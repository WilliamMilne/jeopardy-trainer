import { Field, InputType, Int } from "@nestjs/graphql";
import { Category } from "src/category/category";
import { NewCategoryInput } from "src/category/category.input";
import { Episode } from "src/episode/episode";
import { NewEpisodeInput } from "src/episode/episode.input";

// Note: this is copied pretty much right from clue.ts, but I removed the
// typeorm decorators. There are reasons for this, discussed here: 
// https://github.com/MichalLytek/type-graphql/issues/76
@InputType()
export class NewClueInput {
  @Field(type => String)
  clue: string;

  @Field(type => String)
  response: string;

  @Field(type => NewCategoryInput)
  category: NewCategoryInput;

  @Field(type => NewEpisodeInput)
  episode: NewEpisodeInput;

  @Field(type => Int)
  point_value: number;
}