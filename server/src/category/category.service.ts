import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { Category } from "./category";
import { NewCategoryInput } from "./category.input";

@Injectable()
export class CategoryService {
  constructor(private connection: Connection){}

  async create(input: NewCategoryInput) {
    const repo = await this.connection.getRepository(Category);
    const category = await repo.save({
      name: input.name,
      jArchiveEpisodeId: input.jArchiveEpisodeId
    });
    return category;
  }

  async createOrGet(input: NewCategoryInput){
    const repo = await this.connection.getRepository(Category);
    const existingCategory = await repo.findOne({
      where: {
        jArchiveEpisodeId: input.jArchiveEpisodeId,
        name: input.name
      }
    });
    if (existingCategory) {
      return existingCategory;
    } else {
      return await this.create(input);
    }
  }
}