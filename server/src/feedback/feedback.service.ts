import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { ClueService } from "src/clue/clue.service";
import { UserService } from "src/user/user.service";
import { Connection } from "typeorm";
import { Feedback } from "./feedback";
import { NewFeedbackInput } from "./feedback.input";

@Injectable()
export class FeedbackService {
    constructor(
        private connection: Connection,
        private clueService: ClueService,
        private userService: UserService
    ) {}

    async create(input: NewFeedbackInput) {
        const clue = await this.clueService.findOneById(input.clueId)
        const user = await this.userService.findOneById(input.userId)

        if(!clue || !user) {
            throw new NotFoundException();
        }

        const repo = await this.connection.getRepository(Feedback);
        const feedback = await repo.save({
            comment: input.comment,
            resolved: false,
            clue,
            user
        });
        return feedback;
    }

    async findOneById(id: number): Promise<Feedback> {
        const repo = await this.connection.getRepository(Feedback);
        const feedback = await repo.findOne({
            where: {
                id
            },
            relations: ['clue', 'user']
        });
        return feedback;
    }

    async findAllByUser(userId: number): Promise<Feedback[]> {
        const repo = await this.connection.getRepository(Feedback);
        const feedback = await repo.find({
            where: {
                userId
            },
            relations: ['clue', 'user']
        });
        return feedback;
    }

    async findAllByClue(clueId: number): Promise<Feedback[]> {
        const repo = await this.connection.getRepository(Feedback);
        const feedback = await repo.find({
            where: {
                clueId
            },
            relations: ['clue', 'user']
        });
        return feedback;
    }
}