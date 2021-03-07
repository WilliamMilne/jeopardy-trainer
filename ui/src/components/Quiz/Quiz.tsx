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
      clues {
        id
      }
    }
  }
`

// const GET_CLUES_FOR_CATEGORY = gql`

// `

// Quiz accepts a type, which is either episode or category
// it then gets the list of clues from that episode or category
// and instantiates the cluecontainer and then allows the user to progress
// through the clues in that episode or category.
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

  const { loading: categoryLoading, error: categoryError, data: categoryData } = useQuery(GET_CLUES_FOR_EPISODE,{
    variables: {
      id: quizIdInt
    },
    skip: quizType === 'episode'
  });
  if (episodeLoading || categoryLoading) {
    return <p>Loading...</p>;
  }

  if (episodeError || categoryError) {
    return <p>Error.</p>
  }

  let clueIds: number[] = []
  if (quizType === 'episode') {
    clueIds = episodeData.episode.clues.map((clue: Clue) => {
      return clue.id
    })
  } else if (quizType === 'category') {
    clueIds = categoryData.category.clues.map((clue: Clue) => {
      return clue.id
    })
  }

  return (
    <ClueContainer key={clueIndex} switchToNextClue={() => {setClueIndex(clueIndex + 1)}} clueId={clueIds[clueIndex]}></ClueContainer>
  )
};
