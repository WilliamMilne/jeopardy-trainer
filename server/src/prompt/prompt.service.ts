import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { NewPromptInput } from "./new-prompt.input";
import { Prompt } from "./prompt";

@Injectable()
export class PromptService {
  constructor(private connection: Connection) {

  }
  async create(input: NewPromptInput): Promise<Prompt> {
    // TODO: need to create category and episode if they don't
    // exist yet? and then via their return values
    // pass those along to the input instead I think
    console.log(input);
    const repository = this.connection.getRepository(Prompt);
    const prompt = repository.save({
      ...input // this '...' syntax is the "Spread operator" which assigns the values in one object to another
    });
    return prompt;
  }
  async findOneById(id: number): Promise<Prompt> {
    const repository = this.connection.getRepository(Prompt);
    const user = repository.findOne({
      where: {
        id
      }
    })
    return user;
  }

}