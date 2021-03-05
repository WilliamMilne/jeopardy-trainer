import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './EpisodeView.module.scss';

interface IEpisodeViewParams {
  id: string | undefined
}

export default function EpisodeView() {
  const { id } = useParams<IEpisodeViewParams>();
  return (
    <div>EpisodeView {id}</div>
  );
};
