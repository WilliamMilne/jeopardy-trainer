import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IncorrectResponse from './IncorrectResponse';

describe('<IncorrectResponse />', () => {
  test('it should mount', () => {
    render(<IncorrectResponse />);
    
    const incorrectResponse = screen.getByTestId('IncorrectResponse');

    expect(incorrectResponse).toBeInTheDocument();
  });
});