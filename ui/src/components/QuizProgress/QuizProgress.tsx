import { gql, useQuery } from '@apollo/client';
import { Tile } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { Response } from '../../generated/graphql';
import styles from './QuizProgress.module.scss';

interface IQuizProgressProps {
  cluesByCategory: number[][]
  clueIds: number[]
  episodeTitle: string
}

const GET_USER_RESPONSE_STATUS = gql`
  query getUserResponseStatus($user: Int!, $clues: [Int!]!) {
    userResponses(userId: $user, clueIds: $clues){
      id
      clue{
        id
        category {
          id
        }
      }
      response_correct
    }
  }
`

function countCorrectAndIncorrect(responses: Response[]) {
  console.log("counting correct and incorrect");
  let correct = 0;
  let incorrect = 0;
  for(let i = 0; i < responses.length; i++){
    responses[i].response_correct ? correct++ : incorrect++;
  }
  return {
    correct,
    incorrect
  }
}

export default function QuizProgress(props: IQuizProgressProps) {
  const { clueIds } = props;
  // create evenly-spaced grid to represent each question
  // each clue can have a box to itself
  // each category will be a row
  console.log(props.cluesByCategory);

  let [correct, setCorrect] = useState(0);
  let [incorrect, setIncorrect] = useState(0);

  const { loading: responsesLoading, error: responsesError, data: responsesData } = useQuery(GET_USER_RESPONSE_STATUS, {
    variables: {
      user: 1,
      clues: clueIds
    },
    pollInterval: 500 
    // poll interval igonres the cached value and gets a new value
    // in the future, this shouldn't poll but a react state should get updated
    // by our friendly neighborhood clue component when the user actually answers
  })

  if (responsesLoading) {
    return <p>Loading...</p>;
  }

  if (responsesError) {
    console.log(responsesError);
    return <p>Error.</p>
  }

  console.log("response data " + new Date(), responsesData);
  let { correct: correctCount, incorrect: incorrectCount } = countCorrectAndIncorrect(responsesData.userResponses);
  console.log(correctCount, incorrectCount);
  return (
    <Tile>
      <p>{props.episodeTitle}</p>
      <p>Correct: {correctCount}</p>
      <p>Incorrect: {incorrectCount}</p>
      <p>Unanswered: {clueIds.length - correctCount - incorrectCount}</p>
    </Tile>
  );
};
