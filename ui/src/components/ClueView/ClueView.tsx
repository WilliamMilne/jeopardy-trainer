import React from 'react';
import styles from './ClueView.module.scss';

import { Tile } from 'carbon-components-react'
import { gql, useQuery } from '@apollo/client';
import { Clue } from '../../generated/graphql';

const GET_CLUE = gql`
  query GetClue {
    clue(id:1) {
      clue
      category {
        name
      }
      episode {
        name
      }
    }
  }
`

function ClueV() {
  const { loading, error, data } = useQuery(GET_CLUE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message} {error.graphQLErrors.toString()}</p>;
  console.log(data);
  const { category, episode, clue } = data.clue;

  return (
    <div>
      <p>{clue} from {category.name} in {episode.name}</p>
    </div>
  )
}

// const ClueView: React.FC = () => (
//   <div className={styles.ClueView} data-testid="ClueView">
//     <Tile></Tile>
//   </div>
// );

export default ClueV;
