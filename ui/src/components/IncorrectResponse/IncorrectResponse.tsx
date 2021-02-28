import { CloseFilled32 } from '@carbon/icons-react';
import React from 'react';
import styles from './IncorrectResponse.module.scss';

interface IIncorrectResponseProps {
  correctResponse: string
  userResponse: string
}

function IncorrectResponse(props: IIncorrectResponseProps) {
  return (
    <div className={styles.container}>
      <CloseFilled32
       className={styles.icon} />
      <h2>You answered "{props.userResponse}" but the correct answer is "{props.correctResponse}".</h2>
    </div>
  )
}

export default IncorrectResponse;
