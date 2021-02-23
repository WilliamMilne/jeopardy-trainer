import { Resolver, Query } from "@nestjs/graphql";
import { Prompt } from "src/entities/prompt";

@Resolver(of => Prompt)
export class TestResolver {

  @Query(returns => [Prompt])
  async responses() {
    return [
      new Prompt()
    ]
  }
}
