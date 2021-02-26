import { Injectable } from "@nestjs/common";
import { CategoryService } from "src/category/category.service";
import { Episode } from "src/episode/episode";
import { EpisodeService } from "src/episode/episode.service";
import { Connection } from "typeorm";
import { NewPromptInput } from "./new-prompt.input";
import { Prompt } from "./prompt";

@Injectable()
export class PromptService {
  constructor(private connection: Connection, private episodeService: EpisodeService, private categoryService: CategoryService) {

  }
  async create(input: NewPromptInput): Promise<Prompt> {
    // TODO: need to create category and episode if they don't
    // exist yet? and then via their return values
    // pass those along to the input instead I think
    const episode = await this.episodeService.createOrGet(input.episode);
    const category = await this.categoryService.createOrGet(input.category, episode);

    const newInput: Prompt = {
      prompt: input.prompt,
      point_value: input.point_value,
      response: input.response,
      episode,
      category
    }
    const repository = await this.connection.getRepository(Prompt);
    const prompt = await repository.save(newInput);
    return prompt;
  }
  async findOneById(id: number): Promise<Prompt> {
    const repository = await this.connection.getRepository(Prompt);
    const user = await repository.findOne({
      where: {
        id
      }
    })
    return user;
  }
  async findAll(args: any): Promise<Prompt[]> {
    const repo = await this.connection.getRepository(Prompt);
    const prompts = repo.find(args);
    return prompts;
  }

}