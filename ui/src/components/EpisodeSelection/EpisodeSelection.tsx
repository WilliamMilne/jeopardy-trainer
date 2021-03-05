import { gql, useQuery } from '@apollo/client';
import { DataTable, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import React from 'react';
import styles from './EpisodeSelection.module.scss';

const GET_EPISODES = gql`
  query Episodes {
    episodes {
      id
      name
      clues {
        id
      }
    }
  }
`

const GET_RESPONSES = gql`
  query GetUserResponses($userId: Int!) {
    userResponses(userId: $userId) {
      clue {
        id
      }
      response_correct
    }
  }
`

interface IEpisodeSelectionProps {
  userId: number
}

const headers: string[] = [
  'Episode',
  'Number of Clues',
  // 'Correct',
  // 'Incorrect',
  // 'Correctness Ratio'
]

// const rows: any = [
//   {
//     episode: "ep",
//     numberOfClues: 123,
//     correct: 13,
//     incorrect: 13,
//     correctness: 2/10
//   }
// ]

interface ITableRow {
  episodeName: string
  numberOfClues: number
  // numberCorrect: number
  // numberIncorrect: number
  // correctnessRatio: number
}

function getRows(episodeData: any, responseData: any): ITableRow[] {
  const rows: ITableRow[] = []
  // a row is an episode with some calculations
  for(let i = 0; i < episodeData.episodes.length; i++) {

    const row: ITableRow = {
      episodeName: episodeData.episodes[i].name,
      numberOfClues: episodeData.episodes[i].clues.length
    }

    rows.push(row);
    // const row = {
    //   episodeName: episodeData.episodes[i],
    //   numberOfClues: episodeData.episodes[i].clues.length,
    //   numberCorrect: 
    // }
  }

  return rows;
}

export default function EpisodeSelection(props: IEpisodeSelectionProps) {
  const { loading: episodeLoading, error: episodeError, data: episodeData } = useQuery(GET_EPISODES);
  const { loading: responseLoading, error: responseError, data: responseData } = useQuery(GET_RESPONSES, {
    variables: {
      userId: props.userId
    }
  })

  if (episodeLoading || responseLoading) {
    return <div>Loading...</div>
  }

  if (episodeError || responseError) {
    return <div>Error!</div>
  }

  console.log(episodeData);
  console.log(responseData);
  
  const rows = getRows(episodeData, responseData);
  console.log(rows);


  return (
    <div className={styles.EpisodeSelection}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader key={header}>{header}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow key={row.episode}>
              {Object.keys(row)
                .map((key) => {
                  return <TableCell key={key}>{row[key]}</TableCell>
                })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
