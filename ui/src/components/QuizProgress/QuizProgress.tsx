import { Tile } from 'carbon-components-react';
import React from 'react';
import styles from './QuizProgress.module.scss';

export default function QuizProgress() {
  let episodeTitle = "Tuesday, September 14, 2004"
  return (
    <Tile>
      <p>{episodeTitle}</p>
    </Tile>
  );
};
