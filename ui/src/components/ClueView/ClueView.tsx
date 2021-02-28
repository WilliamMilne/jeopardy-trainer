import React, { useState } from 'react';
import styles from './ClueView.module.scss';

import { Button, PropTypes, TextInput, Tile } from 'carbon-components-react'
import { gql, useMutation, useQuery } from '@apollo/client';
import { Clue } from '../../generated/graphql';
import { title } from 'process';

const GET_CLUE = gql`
  query GetClue($id: Int!) {
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

const SUBMIT_RESPONSE = gql`
  mutation SubmitResponse($user: ID!, $clue: ID!, $response: String!) {
    submitResponse(responseInput: {
      userId: $user,
      clueId: $clue,
      user_response: $response
    }) {
      response_correct
    }
  }
`

interface IClueViewProps {
  clueId: number
}

// function enterPressed(event: any) {
//   var code = event.keyCode || event.which;
//   if(code === 13) { 
//     submitResponse({ 
//       variables: { 
//         user: 1,
//         clue: 1,
//         response
//       }
//     });
//   } 
// }

function ClueView(this: any, props: IClueViewProps) {
  const [response, setResponse] = useState('');
  const [submitResponse, { data: responseData }] = useMutation(SUBMIT_RESPONSE)
  console.log(responseData);
  const { loading, error, data } = useQuery(GET_CLUE, {
    variables: {
      id: props.clueId
    }
  });
  if (responseData !== undefined) {
    console.log(responseData);
    if (responseData.submitResponse.response_correct) {
      return <p>Great job!</p>
    } else {
      return <p>Oops you're wrong.</p>
    }
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message} {error.graphQLErrors.toString()}</p>;

  const { category, episode, clue, point_value } = data.clue;
  return (
    <div>
      <Tile className={styles.Tile}>
        <p className={styles.category}>Category: {category.name}</p>
        <p className={styles.value}>Value: ${point_value}</p>
        <h2 className={styles.clue}>{clue}</h2>
        <div className={styles.response}>        
          <TextInput 
            id={"clueInput"+props.clueId} 
            labelText="Enter your response"
            onChange={event => setResponse(event.target.value)}  
            onKeyPress={(event) => {
              var code = event.key;
              console.log(code);
              if (code === "Enter") {
                submitResponse({
                  variables: {
                    user: 1,
                    clue: props.clueId,
                    response
                  }
                })
              }
            }}
          ></TextInput>
        </div>
        <Button className={styles.submit}>Submit</Button>
      </Tile>
    </div>
  )
}

export default ClueView;
