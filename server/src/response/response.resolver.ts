import { Args, Mutation, Resolver, Query, Int } from "@nestjs/graphql";
import { NewResponseInput } from "./new-response.input";
import { ResponseService } from "./response.service";
import { Response } from "./response"
import { NotFoundException } from "@nestjs/common";

@Resolver(of => Response)
export class ResponseResolver {
  constructor(private readonly responseService: ResponseService) { }

  @Query(returns => Response)
  async response(@Args('id', { type: () => Int }) id: number): Promise<Response> {
    const response = await this.responseService.findOneById(id);
    if (!response) {
      throw new NotFoundException(id);
    }
    return response;
  }

  @Mutation(returns => Response)
  async submitResponse(@Args('responseInput') responseInput: NewResponseInput): Promise<Response> {
    const response = await this.responseService.create(responseInput);
    return response;
  } 
}