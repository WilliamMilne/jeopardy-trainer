import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { Episode } from "./episode";
import { NewEpisodeInput } from "./episode.input";

@Injectable()
export class EpisodeService {
  constructor(private connection: Connection) {}

  async create(input: NewEpisodeInput): Promise<Episode> {
    const repository = await this.connection.getRepository(Episode);
    const episode = await repository.save({
      name: input.name,
      jArchiveId: input.jArchiveId
    });
    return episode;
  }
  
  async createOrGet(input: NewEpisodeInput): Promise<Episode> {
    const repository = await this.connection.getRepository(Episode);
    const existingEpisode = await repository.findOne({
      where: {
        jArchiveId: input.jArchiveId
      }
    });
    if (existingEpisode) {
      return existingEpisode;
    } else {
      return await this.create(input);
    }
  }
}