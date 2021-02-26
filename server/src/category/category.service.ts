import { Injectable } from "@nestjs/common";
import { Episode } from "src/episode/episode";
import { Connection } from "typeorm";
import { Category } from "./category";
import { NewCategoryInput } from "./category.input";

@Injectable()
export class CategoryService {
  constructor(private connection: Connection){}

  async create(input: NewCategoryInput, episode: Episode) {
    const repo = await this.connection.getRepository(Category);
    const category = await repo.save({
      name: input.name,
      episode
    });
    return category;
  }

  async createOrGet(input: NewCategoryInput, episode: Episode){
    const repo = await this.connection.getRepository(Category);
    const existingCategory = await repo.findOne({
      where: {
        episode,
        name: input.name
      }
    });
    if (existingCategory) {
      return existingCategory;
    } else {
      return await this.create(input, episode);
    }
  }
}