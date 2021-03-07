import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clue } from '../../generated/graphql';
import ClueContainer from '../ClueContainer/ClueContainer';
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
      clues {
        id
      }
    }
  }
`

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

  let clueIds: number[] = []
  if (quizType === 'episode') {
    clueIds = episodeData.episode.clues.map((clue: Clue) => {
      return clue.id
    })
  }

  return (
    <ClueContainer key={`${episodeData.episode.id}${clueIndex}`} switchToNextClue={() => {setClueIndex(clueIndex + 1)}} clueId={clueIds[clueIndex]}></ClueContainer>
  )
};
