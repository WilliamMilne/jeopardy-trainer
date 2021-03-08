import { Tile } from 'carbon-components-react';
import React from 'react';
import styles from './QuizProgress.module.scss';

interface IQuizProgressProps {
  cluesByCategory: number[][]
  resultByClue: number[][]
}

export default function QuizProgress(props: IQuizProgressProps) {
  // create evenly-spaced grid to represent each question
  // each clue can have a box to itself
  // each category will be a row
  console.log(props.cluesByCategory);

  let episodeTitle = "Tuesday, September 14, 2004"
  return (
    <Tile>
      <p>{episodeTitle}</p>
      
    </Tile>
  );
};
