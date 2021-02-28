import { NotFoundException } from "@nestjs/common";
import { Args, Resolver, Query, Int } from "@nestjs/graphql";
import { Episode } from "./episode";
import { EpisodeService } from "./episode.service";

@Resolver(of => Episode)
export class EpisodeResolver {
  constructor(private readonly episodeService: EpisodeService) {}

  @Query(returns => Episode)
  async episode(@Args('id', { type: () => Int }) id: number): Promise<Episode> {
    const episode = await this.episodeService.findOneById(id);
    if (!episode) {
      throw new NotFoundException(id);
    }
    return episode;
  }
}