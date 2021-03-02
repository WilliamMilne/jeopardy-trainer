import { Injectable } from "@nestjs/common";
import { CategoryService } from "src/category/category.service";
import { Episode } from "src/episode/episode";
import { EpisodeService } from "src/episode/episode.service";
import { Connection } from "typeorm";
import { NewClueInput } from "./new-clue.input";
import { Clue } from "./clue";

@Injectable()
export class ClueService {
  constructor(private connection: Connection, private episodeService: EpisodeService, private categoryService: CategoryService) {}
  
  async create(input: NewClueInput): Promise<Clue> {
    const episode = await this.episodeService.createOrGet(input.episode);
    const category = await this.categoryService.createOrGet(input.category, episode);

    const newInput: Clue = {
      clue: input.clue,
      point_value: input.point_value,
      correctResponse: input.correctResponse,
      episode,
      category
    }
    const repository = await this.connection.getRepository(Clue);
    const clue = await repository.save(newInput);
    return clue;
  }

  async findOneById(id: number): Promise<Clue> {
    const repository = await this.connection.getRepository(Clue);
    const user = await repository.findOne({
      where: {
        id
      },
      relations: ['category', 'episode']
    })
    return user;
  }

  async findAll(args: any): Promise<Clue[]> {
    const repo = await this.connection.getRepository(Clue);
    const clues = repo.find(args);
    return clues;
  }

}