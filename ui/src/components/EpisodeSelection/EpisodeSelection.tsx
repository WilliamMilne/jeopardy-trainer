import { gql, useQuery } from '@apollo/client';
import { ClickableTile, DataTable, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tile } from 'carbon-components-react';
import React from 'react';
import { Episode } from '../../generated/graphql';
import styles from './EpisodeSelection.module.scss';

const GET_EPISODES = gql`
  query Episodes {
    episodes {
      id
      name
      categories {
        id
        name
      }
    }
  }
`

interface IEpisodeSelectionProps {
  userId: number
}

export default function EpisodeSelection(props: IEpisodeSelectionProps) {
  const { loading: episodeLoading, error: episodeError, data: episodeData } = useQuery(GET_EPISODES);

  if (episodeLoading) {
    return <div>Loading...</div>
  }

  if (episodeError) {
    return <div>Error!</div>
  }

  const episodeList = episodeData.episodes.map((ep: Episode) => {
    return <ClickableTile key={`episode-tile-${ep.id}`} href={'/episodes/' + ep.id}>{ep.name}</ClickableTile>
  })

  return (
    <div className={styles.EpisodeSelection}>
      {episodeList}
    </div>
  );
};
