import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomTrainingConfig from './CustomTrainingConfig';

describe('<CustomTrainingConfig />', () => {
  test('it should mount', () => {
    render(<CustomTrainingConfig />);
    
    const customTrainingConfig = screen.getByTestId('CustomTrainingConfig');

    expect(customTrainingConfig).toBeInTheDocument();
  });
});