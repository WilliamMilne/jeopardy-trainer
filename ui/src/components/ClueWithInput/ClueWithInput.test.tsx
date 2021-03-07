import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ClueWithInput from './ClueWithInput';

describe('<ClueWithInput />', () => {
  test('it should mount', () => {
    render(<ClueWithInput />);
    
    const clueWithInput = screen.getByTestId('ClueWithInput');

    expect(clueWithInput).toBeInTheDocument();
  });
});