import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CategorySelection from './CategorySelection';

describe('<CategorySelection />', () => {
  test('it should mount', () => {
    render(<CategorySelection />);
    
    const categorySelection = screen.getByTestId('CategorySelection');

    expect(categorySelection).toBeInTheDocument();
  });
});