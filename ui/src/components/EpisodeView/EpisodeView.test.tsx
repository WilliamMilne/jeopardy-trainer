import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EpisodeView from './EpisodeView';

describe('<EpisodeView />', () => {
  test('it should mount', () => {
    render(<EpisodeView />);
    
    const episodeView = screen.getByTestId('EpisodeView');

    expect(episodeView).toBeInTheDocument();
  });
});