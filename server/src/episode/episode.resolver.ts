import { NotFoundException } from "@nestjs/common";
import { Args, Resolver, Query } from "@nestjs/graphql";
import { PromptService } from "src/prompt/prompt.service";
import { Episode } from "./episode";
import { EpisodeService } from "./episode.service";

@Resolver(of => Episode)
export class EpisodeResolver {
  constructor(private readonly episodeService: EpisodeService, private readonly promptService: PromptService) {}

  @Query(returns => Episode)
  async episode(@Args('id') id: number): Promise<Episode> {
    const episode = await this.episodeService.findOneById(id);
    console.log(episode);
    if (!episode) {
      throw new NotFoundException(id);
    }
    // this definitely doesn't feel like the right way to do this.
    // I feel like since I set up the oneToMany and ManyToOne relationship
    // it should be sort of included... hmm
    const prompts = await this.promptService.findAll({
      where: {
        episode
      }
    })
    episode.prompts = prompts;

    return episode;
  }
}