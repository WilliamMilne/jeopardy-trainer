import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomTrainingConfigEpisode from './CustomTrainingConfigEpisode';

describe('<CustomTrainingConfigEpisode />', () => {
  test('it should mount', () => {
    render(<CustomTrainingConfigEpisode />);
    
    const customTrainingConfigEpisode = screen.getByTestId('CustomTrainingConfigEpisode');

    expect(customTrainingConfigEpisode).toBeInTheDocument();
  });
});