import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ClueView from './ClueView';

describe('<ClueView />', () => {
  test('it should mount', () => {
    render(<ClueView />);
    
    const clueView = screen.getByTestId('ClueView');

    expect(clueView).toBeInTheDocument();
  });
});