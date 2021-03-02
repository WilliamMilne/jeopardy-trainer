import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ClueContainer from './ClueContainer';

describe('<ClueContainer />', () => {
  test('it should mount', () => {
    render(<ClueContainer />);
    
    const clueContainer = screen.getByTestId('ClueContainer');

    expect(clueContainer).toBeInTheDocument();
  });
});