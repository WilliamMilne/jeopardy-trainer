import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Loading, Tile } from 'carbon-components-react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ClueWithInput from '../ClueWithInput/ClueWithInput';
import CorrectResponse from '../CorrectResponse/CorrectResponse';
import IncorrectResponse from '../IncorrectResponse/IncorrectResponse';
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
      user_response
      response_correct
      clue {
        correctResponse
      }
    }
  }
`

interface IClueContainerProps {
  switchToNextClue: any
  clueId: number
}

function ClueContainer(props: IClueContainerProps) {
  const { clueId } = props;
  const { loading, error, data } = useQuery(GET_CLUE, {
    variables: {
      id: clueId
    }
  });

  let [submitResponse, { data: responseData }] = useMutation(SUBMIT_RESPONSE);

  function handleKeyPress(e: any) {
    if (e.key === "Enter") {
      if (responseData !== undefined) {
        console.log("switch to next clue");
        props.switchToNextClue();
        responseData = undefined;
        console.log(responseData);
      }
    }
  }

  // this useEffect hook applies the listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)})

  // this one removes it.
  useEffect(() => {
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  })

  if (loading) {
    return <Loading></Loading>
  } else if (error) {
    return <p>Could not get clue!</p>
  }

  let content;
  console.log("HELLO", responseData);
  if (!responseData) {
    content = <ClueWithInput clue={data.clue.clue} clueId={clueId} clueAnsweredCallback={submitResponse}></ClueWithInput>
  } else {
    if (responseData.submitResponse.response_correct) {
      content = <CorrectResponse correctResponse={responseData.submitResponse.clue.correctResponse}></CorrectResponse>
    } else {
      content = <IncorrectResponse userResponse={responseData.submitResponse.user_response} correctResponse={responseData.submitResponse.clue.correctResponse}></IncorrectResponse>
    }
  }

  return (
    <div>
      <Tile className={styles.Tile}>
        <p className={styles.category}>Category: {data.clue.category.name}</p>
        <p className={styles.value}>Value: ${data.clue.point_value}</p>
        <div>{content}</div>
        {responseData !== undefined && <Button onClick={props.switchToNextClue} className={styles.nextClue}>Next clue!</Button>}
      </Tile>
    </div>
  )
}

export default ClueContainer;
