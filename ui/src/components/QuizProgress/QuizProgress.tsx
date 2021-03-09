import { gql, useQuery } from '@apollo/client';
import { CheckmarkFilled32, CloseFilled32, HelpFilled32 } from '@carbon/icons-react';
import { Tile } from 'carbon-components-react';
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

enum Correctness {
  'correct',
  'incorrect',
  'unanswered'
}

function createResponseMap(userResponses: Response[]): { [key: number]: Response} {
  let result: { [key: number] : Response } = {}
  for (let response of userResponses) {
    result[response.clue.id] = response;
  }
  return result;
}

function createCorrectnessArray(categoryClues: number[], userResponseMap: { [key: number]: Response }): Correctness[] {
  const result: Correctness[] = [];
  for (let i = 0; i < categoryClues.length; i++) {
    const clue = categoryClues[i];
    if (userResponseMap[clue] !== undefined) {
      const correct = userResponseMap[clue].response_correct ? 
        Correctness.correct : Correctness.incorrect;
      result.push(correct);
    } else {
      result.push(Correctness.unanswered);
    }
  }
  return result;
}

function createCategoryCorrectnessRows(cluesByCategory: number[][], userResponses: Response[]): any {
  let resultComponent: any = [];
  const responseMap = createResponseMap(userResponses);

  for (let category in cluesByCategory) {
    const correctnessArray = createCorrectnessArray(cluesByCategory[category], responseMap);
    const row = createCategoryCorrectnessRow(correctnessArray);
    resultComponent = [resultComponent, row]
  }
  // convert each category into a correctness array
  return resultComponent;
}

function createCategoryCorrectnessRow(correctness: Correctness[]): any{
  let content: any = [];
  let i = 0;
  for (i; i < correctness.length; i++) {
    let result;
    if (correctness[i] === Correctness.unanswered) {
      result = <HelpFilled32 className={styles.Unanswered}></HelpFilled32>;
    } else if (correctness[i] === Correctness.correct) {
      result = <CheckmarkFilled32 className={styles.Correct}></CheckmarkFilled32>;
    } else {
      result = <CloseFilled32 className={styles.Incorrect}></CloseFilled32>;
    }
          
    content = [content, result];
  }

  // need an array of booleans
  return (
    <div className={styles.CategoryRow}>
      {content}
    </div>
  );
}

function countCorrectAndIncorrect(responses: Response[]) {
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
    return <p>Error.</p>
  }

  let correctnessRows = createCategoryCorrectnessRows(props.cluesByCategory, responsesData.userResponses);

  let { correct: correctCount, incorrect: incorrectCount } = countCorrectAndIncorrect(responsesData.userResponses);
  return (
    <Tile>
      <p>{props.episodeTitle}</p>
      <div>{correctnessRows}</div>
      <p>Correct: {correctCount}</p>
      <p>Incorrect: {incorrectCount}</p>
      <p>Unanswered: {clueIds.length - correctCount - incorrectCount}</p>
    </Tile>
  );
};
