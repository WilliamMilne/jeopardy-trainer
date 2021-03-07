import { Injectable, NotFoundException } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { Episode } from "./episode";
import { NewEpisodeInput } from "./episode.input";

@Injectable()
export class EpisodeService {
  async getAllEpisodes(): Promise<Episode[]> {
    const repo = await this.connection.getRepository(Episode);
    const episodes = await repo.find({
      relations: ["categories", "clues"]
    });
    if (!episodes) {
      throw new NotFoundException();
    }
    return episodes;
  }
  async findOneById(id: number): Promise<Episode> {
    const repo = await this.connection.getRepository(Episode);
    const episode = await repo.findOne({
      where: {
        id: id
      },
      relations: ["categories", "clues", "clues.category"]
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