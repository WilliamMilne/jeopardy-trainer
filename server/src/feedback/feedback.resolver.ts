import { NotFoundException } from "@nestjs/common";
import { Resolver, Query, Args, Mutation, Int } from "@nestjs/graphql";
import { Clue } from "src/clue/clue";
import { NewClueInput } from "src/clue/new-clue.input";
import { User } from "src/user/user";
import { Feedback } from "./feedback";
import { NewFeedbackInput } from "./feedback.input";
import { FeedbackService } from "./feedback.service";

@Resolver(of => Feedback)
export class FeedbackResolver {
    constructor(private readonly feedbackService: FeedbackService) {}

    @Query(returns => Feedback)
    async feedbackById(@Args('id', { type: () => Int}) id: number): Promise<Feedback> {
        const feedback = await this.feedbackService.findOneById(id);
        if (!feedback) {
            throw new NotFoundException(id);
        }
        return feedback;
    }

    @Query(returns => Feedback)
    async feedbackByClue(@Args('clueId', { type: () => Int}) clueId: number): Promise<Feedback[]> {
        const feedback = await this.feedbackService.findAllByClue(clueId);
        if (feedback.length === 0) {
            throw new NotFoundException();
        }
        return feedback;
    }

    @Query(returns => Feedback)
    async feedbackByUser(@Args('userId', { type: () => Int}) userId: number): Promise<Feedback[]> {
        const feedback = await this.feedbackService.findAllByUser(userId);
        if (feedback.length === 0) {
            throw new NotFoundException();
        }
        return feedback;
    }

    @Mutation(returns => Feedback)
    async addFeedback(
        @Args('feedbackInput') feedback_input: NewFeedbackInput,
    ): Promise<Feedback> {
        const feedback = await this.feedbackService.create(feedback_input);
        return feedback;
    }
}