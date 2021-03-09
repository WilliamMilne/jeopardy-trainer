import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clue } from '../../generated/graphql';
import ClueContainer from '../ClueContainer/ClueContainer';
import QuizProgress from '../QuizProgress/QuizProgress';
import styles from './Quiz.module.scss';

interface IQuizProps {
  quizType: 'category' | 'episode'
}

interface IQuizUrlProps {
  quizId: string
}

const GET_CLUES_FOR_EPISODE = gql`
  query getCluesForEpisode($id: Int!) {
    episode(id: $id) {
      id
      name
      clues {
        id
        category {
          id
        }
      }
    }
  }
`

function getOrderedClueIds(clues: Clue[]): any {
  let clueIds: number[] = [];
  const categories: any = {};

  for(let i = 0; i < clues.length; i++) {
    if (categories[clues[i].category.id] === undefined) {
      categories[clues[i].category.id] = [];
    }
    categories[clues[i].category.id].push(clues[i].id);
  }

  for(let index in categories) {
    clueIds = clueIds.concat(categories[index]);
  }

  return { 
    clueIds,
    categories
  };
}

export default function Quiz(props: IQuizProps) {
  const { quizType } = props;
  const { quizId } = useParams<IQuizUrlProps>();
  const quizIdInt = parseInt(quizId || "0");

  let [clueIndex, setClueIndex] = useState(0);

  const { loading: episodeLoading, error: episodeError, data: episodeData } = useQuery(GET_CLUES_FOR_EPISODE,{
    variables: {
      id: quizIdInt
    },
    skip: quizType === 'category'
  });

  if (episodeLoading) {
    return <p>Loading...</p>;
  }

  if (episodeError) {
    return <p>Error.</p>
  }

  let { clueIds, categories } = getOrderedClueIds(episodeData.episode.clues);

  // resultsByClue will be the same dimensions as 'categories'
  // and will have 0 for unanswered, 1 for correct, and -1 for incorrect
  return (
    <div className={styles.Quiz}>
      <QuizProgress 
        episodeTitle={episodeData.episode.name}
        cluesByCategory={categories}
        clueIds={clueIds}
      ></QuizProgress>
      <ClueContainer key={`${episodeData.episode.id}${clueIndex}`} switchToNextClue={(arg: any) => {
        setClueIndex(clueIndex + 1);
        }} clueId={clueIds[clueIndex]}></ClueContainer>
    </div>
  )
};
