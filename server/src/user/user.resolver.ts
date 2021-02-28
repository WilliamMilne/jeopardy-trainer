// import { PubSub } from "apollo-server-express";
import { NotFoundException } from "@nestjs/common";
import { Resolver, Query, Args, Mutation, Int } from "@nestjs/graphql";
import { User } from "./user";
import { UserService } from "./user.service";

// const pubSub = new PubSub(); NOTE: In the future if we want to push a modification to a client, we can use pubsub.

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user){
      throw new NotFoundException(id);
    }
    return user;
  }

  @Mutation(returns => User)
  async addUser(
    @Args('name') name: string,
  ): Promise<User> {
    const user = await this.userService.create(name);
    return user;
  }
}