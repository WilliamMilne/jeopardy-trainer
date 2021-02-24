import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { User } from "./user";

@Injectable()
export class UserService {
  constructor(private connection: Connection) {

  }
  async create(name: string): Promise<User> {
    const repository = this.connection.getRepository(User);
    const user = repository.save({
      name
    });
    return user;
  }
  async findOneById(id: number): Promise<User> {
    const repository = this.connection.getRepository(User);
    const user = repository.findOne({
      where: {
        id
      }
    })
    return user;
  }

}