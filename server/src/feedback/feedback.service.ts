import { Injectable } from "@nestjs/common";
import { Clue } from "src/clue/clue";
import { Connection } from "typeorm";
import { Feedback } from "./feedback";
import { NewFeedbackInput } from "./feedback.input";

@Injectable()
export class FeedbackService {
    constructor(private connection: Connection){}

    async create(input: NewFeedbackInput, clue: Clue) {
        const repo = await this.connection.getRepository(Feedback);
        const feedback = await repo.save({
            comment: input.comment,
            clue
        });
        return feedback;  
    }
}