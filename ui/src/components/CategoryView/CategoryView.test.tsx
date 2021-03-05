import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CategoryView from './CategoryView';

describe('<CategoryView />', () => {
  test('it should mount', () => {
    render(<CategoryView />);
    
    const categoryView = screen.getByTestId('CategoryView');

    expect(categoryView).toBeInTheDocument();
  });
});