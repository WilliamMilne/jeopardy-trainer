import { gql, useMutation, useQuery } from '@apollo/client';
import { Loading, Tile } from 'carbon-components-react';
import React, { useState } from 'react';
import ClueWithInput from '../ClueWithInput/ClueWithInput';
import styles from './ClueContainer.module.scss';

// const ClueContainer: React.FC = () => (
//   <div className={styles.ClueContainer} data-testid="ClueContainer">
//     ClueContainer Component
//   </div>
// );

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

interface IClueContainerProps {
  clueId: number
}

function ClueContainer(props: IClueContainerProps) {
  const { clueId } = props;
  const { loading, error, data } = useQuery(GET_CLUE, {
    variables: {
      id: clueId
    }
  });

  const [submitResponse, { data: responseData }] = useMutation(SUBMIT_RESPONSE);

  console.log("ResponseData", responseData);

  if (loading) {
    return <Loading></Loading>
  } else if (error) {
    return <p>Could not get clue!</p>
  }

  let content;
  if (!responseData) {
    content = <ClueWithInput clue={data.clue.clue} clueId={clueId} clueAnsweredCallback={submitResponse}></ClueWithInput>
  } else {
    if (responseData.submitResponse.response_correct) {
      content = <p className={styles.Tile}>Great job!</p>
    } else {
      content = <p className={styles.Tile}>Oops you're wrong.</p>
    }
  }

  return (
    <div>
      <Tile className={styles.Tile}>
        <p className={styles.category}>Category: {data.clue.category.name}</p>
        <p className={styles.value}>Value: ${data.clue.point_value}</p>
        <div>{content}</div>
      </Tile>
    </div>
  )
}



export default ClueContainer;
