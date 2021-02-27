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
    if (!episode) {
      throw new NotFoundException(id);
    }
    return episode;
  }
}