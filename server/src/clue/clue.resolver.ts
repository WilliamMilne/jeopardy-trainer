// import { PubSub } from "apollo-server-express";
import { NotFoundException } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { NewClueInput } from "./new-clue.input";
import { Clue } from "./clue";
import { ClueService } from "./clue.service";

// const pubSub = new PubSub(); NOTE: In the future if we want to push a modification to a client, we can use pubsub.

@Resolver(of => Clue)
export class ClueResolver {
  constructor(private readonly clueService: ClueService) {}

  @Query(returns => Clue)
  async clue(@Args('id') id: number): Promise<Clue> {
    const clue = await this.clueService.findOneById(id);
    if (!clue){
      throw new NotFoundException(id);
    }
    return clue;
  }

  @Mutation(returns => Clue)
  async addClue(
    @Args('clueInput') clue_input: NewClueInput,
  ): Promise<Clue> {
    const clue = await this.clueService.create(clue_input);
    return clue;
  }
}