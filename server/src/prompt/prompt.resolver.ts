// import { PubSub } from "apollo-server-express";
import { NotFoundException } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { NewPromptInput } from "./new-prompt.input";
import { Prompt } from "./prompt";
import { PromptService } from "./prompt.service";

// const pubSub = new PubSub(); NOTE: In the future if we want to push a modification to a client, we can use pubsub.

@Resolver(of => Prompt)
export class PromptResolver {
  constructor(private readonly promptService: PromptService) {}

  @Query(returns => Prompt)
  async prompt(@Args('id') id: number): Promise<Prompt> {
    const prompt = await this.promptService.findOneById(id);
    if (!prompt){
      throw new NotFoundException(id);
    }
    return prompt;
  }

  @Mutation(returns => Prompt)
  async addPrompt(
    @Args('promptInput') prompt_input: NewPromptInput,
  ): Promise<Prompt> {
    const prompt = await this.promptService.create(prompt_input);
    return prompt;
  }
}