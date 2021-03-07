import React, { useEffect } from 'react';
import styles from './CorrectResponse.module.scss';
import { CheckmarkFilled32 } from '@carbon/icons-react'

interface ICorrectResponseProps {
  correctResponse: string
}

function CorrectResponse(props: ICorrectResponseProps) {
  return (
    <div className={styles.container}>
      <CheckmarkFilled32 className={styles.checkmark} />
      <h2>{props.correctResponse} is the correct response!</h2>
    </div>
  )
}

export default CorrectResponse;