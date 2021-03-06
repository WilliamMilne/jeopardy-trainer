import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Episode } from '../../generated/graphql';
import CustomTrainingConfigEpisode from '../CustomTrainingConfigEpisode/CustomTrainingConfigEpisode';
import styles from './CustomTrainingConfig.module.scss';

const GET_EPISODE_DATA = gql`
  query GetEpisodes {
    episodes {
      id
      name
      categories {
        name
        id
      }
    }
  }
`

export default function CustomTrainingConfig() {
  const { loading, error, data } = useQuery(GET_EPISODE_DATA);
  console.log(data);
  if (loading) {
    return <p>Loading...</p>
  }
  const episodeList = data.episodes.map((el: Episode) => {
    return <CustomTrainingConfigEpisode key={el.id} episode={el}></CustomTrainingConfigEpisode>
  });

  return (
    <ul>{ episodeList }</ul>
  )
};
