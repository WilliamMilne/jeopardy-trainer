import { Injectable, NotFoundException } from "@nestjs/common";
import { ClueService } from "src/clue/clue.service";
import { UserService } from "src/user/user.service";
import { Connection } from "typeorm";
import { NewResponseInput } from "./new-response.input";
import { Response } from "./response"

@Injectable()
export class ResponseService {
  constructor(
    private connection: Connection,
    private clueService: ClueService, 
    private userService: UserService
  ) {}

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

  async create(input: NewResponseInput): Promise<Response> {
    const clue = await this.clueService.findOneById(input.clueId);
    const user = await this.userService.findOneById(input.userId);

    if(!clue || !user) {
      throw new NotFoundException();
    }

    const isResponseCorrect = this.determineCorrectness(input.user_response, clue.correctResponse); // todo: make casing of user_response and correctResponse consistent?

    const response: Response = {
      user,
      clue,
      user_response: input.user_response,
      response_correct: isResponseCorrect
    }

    const repo = this.connection.getRepository(Response);
    const result = repo.save(response)

    return result;
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