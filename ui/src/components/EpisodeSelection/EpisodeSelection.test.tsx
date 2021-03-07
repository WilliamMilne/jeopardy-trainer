import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EpisodeSelection from './EpisodeSelection';

describe('<EpisodeSelection />', () => {
  test('it should mount', () => {
    render(<EpisodeSelection />);
    
    const episodeSelection = screen.getByTestId('EpisodeSelection');

    expect(episodeSelection).toBeInTheDocument();
  });
});