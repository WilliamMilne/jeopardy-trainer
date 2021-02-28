import { gql, useMutation } from '@apollo/client';
import { Button, TextInput } from 'carbon-components-react';
import React, { useState } from 'react';
import styles from './ClueWithInput.module.scss';

// const ClueWithInput: React.FC = () => (
//   <div className={styles.ClueWithInput} data-testid="ClueWithInput">
//     ClueWithInput Component
//   </div>
// );

interface IClueWithInputProps {
  clue: string
  clueId: number
  clueAnsweredCallback: any // figure out how to pass function
}

function ClueWithInput(props: IClueWithInputProps) {
  const { clue, clueId } = props;
  const [response, setResponse] = useState('');

  return (
    <div>
      <h2 className={styles.clue}>{clue}</h2>
      <div className={styles.response}>        
        <TextInput 
          id={"clueInput"+clueId} 
          labelText="Enter your response"
          onChange={event => setResponse(event.target.value)}  
          onKeyPress={(event) => {
            var code = event.key;
            if (code === "Enter") {
              props.clueAnsweredCallback({
                variables: {
                  user: 1,
                  clue: clueId,
                  response
                }
              })
            }
          }}
        ></TextInput>
      </div>
      <Button className={styles.submit} onClick={() => {
        props.clueAnsweredCallback({
          variables: {
            user: 1,
            clue: clueId,
            response
          }
        })
      }}>Submit</Button>
    </div>
  )
}

export default ClueWithInput;
