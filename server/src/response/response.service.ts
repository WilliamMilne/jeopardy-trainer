import { Injectable, NotFoundException } from "@nestjs/common";
import { Clue } from "src/clue/clue";
import { ClueService } from "src/clue/clue.service";
import { User } from "src/user/user";
import { UserService } from "src/user/user.service";
import { Connection, In } from "typeorm";
import { NewResponseInput } from "./new-response.input";
import { Response } from "./response"

@Injectable()
export class ResponseService {
  constructor(
    private connection: Connection,
    private clueService: ClueService, 
    private userService: UserService
  ) {}

  async findResponses(userId: number, clues: number[]) {
    const repo = this.connection.getRepository(Response);
    const responses = await repo.find({
      where: {
        clue: In(clues),
        user: userId
      },
      relations: ['clue', 'clue.category']
    })
    return responses;
  }

  async findOneById(id: number): Promise<Response> {
    const repo = this.connection.getRepository(Response);
    const response = repo.findOne({
      where: {
        id
      },
      relations:["user", "clue"]
    });
    return response;
  }

  async findResponseForUser(user: User, clue: Clue): Promise<Response> {
    return await this.connection.getRepository(Response).findOne({
      where: {
        user,
        clue
      }, 
      relations: ['clue', 'clue.category']
    })
  }

  // NOTE: Changed this from create to createOrUpdate because there doesn't appear to be
  // a need to store the user's clue HISTORY - all we want is the latest answer they've provided.
  // Generally speaking I don't think users should redo episodes they've already done, but we can 
  // talk about that later.
  async createOrUpdate(input: NewResponseInput): Promise<Response> {
    const clue = await this.clueService.findOneById(input.clueId);
    const user = await this.userService.findOneById(input.userId);

    if(!clue || !user) {
      throw new NotFoundException();
    }

    const isResponseCorrect = this.determineCorrectness(input.user_response, clue.correctResponse); // todo: make casing of user_response and correctResponse consistent?

    const existingResponse = await this.findResponseForUser(user, clue);
    if (existingResponse) {
      existingResponse.user_response = input.user_response
      existingResponse.response_correct = isResponseCorrect
      return await this.connection.getRepository(Response).save(existingResponse);
    } else {
      const response: Response = {
        user,
        clue,
        user_response: input.user_response,
        response_correct: isResponseCorrect
      }
      return await this.connection.getRepository(Response).save(response)
    }
  }

  determineCorrectness(userResponse: string, correctResponse: string) {
    userResponse = userResponse.toLowerCase();
    correctResponse = correctResponse.toLowerCase();

    // Todo: eventually make some fuzzy logic or something
    // for phonetic string matching. If they've never seen it spelled
    // they would still get the correct answer on jeopardy.
    return userResponse === correctResponse;
  }
}