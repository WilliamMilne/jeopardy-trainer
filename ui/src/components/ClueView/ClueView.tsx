import React from 'react';
import styles from './ClueView.module.scss';

import { Button, TextInput, Tile } from 'carbon-components-react'
import { gql, useQuery } from '@apollo/client';
import { Clue } from '../../generated/graphql';

const GET_CLUE = gql`
  query GetClue($id: Float!) {
    clue(id: $id) {
      clue
      category {
        name
      }
      episode {
        name
      }
      point_value
    }
  }
`

interface IClueViewProps {
  clueId: number
}

function ClueView(props: IClueViewProps) {
  const { loading, error, data } = useQuery(GET_CLUE, {
    variables: {
      id: props.clueId
    }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message} {error.graphQLErrors.toString()}</p>;
  console.log(data);
  const { category, episode, clue, point_value } = data.clue;
  return (
    <div>
      <Tile>
        <p>Category: {category.name}</p>
        <p>Value: ${point_value}</p>
        <p>{clue}</p>
        <TextInput id={"clueInput"+props.clueId} labelText="Enter your response"></TextInput>
        <Button>Submit</Button>
      </Tile>
    </div>
  )
}

export default ClueView;
