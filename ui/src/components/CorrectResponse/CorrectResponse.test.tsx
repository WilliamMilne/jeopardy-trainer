import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CorrectResponse from './CorrectResponse';

describe('<CorrectResponse />', () => {
  test('it should mount', () => {
    render(<CorrectResponse />);
    
    const correctResponse = screen.getByTestId('CorrectResponse');

    expect(correctResponse).toBeInTheDocument();
  });
});