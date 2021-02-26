import { Injectable, NotFoundException } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { Episode } from "./episode";
import { NewEpisodeInput } from "./episode.input";

@Injectable()
export class EpisodeService {
  async findOneById(id: number): Promise<Episode> {
    const repo = await this.connection.getRepository(Episode);
    const episode = await repo.findOne({
      where: {
        id: id
      },
      relations: ["categories", "prompts"]
    })
    if (!episode) {
      throw new NotFoundException(id);
    } else {
      return episode;
    }
  }
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