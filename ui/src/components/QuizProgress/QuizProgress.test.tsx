import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QuizProgress from './QuizProgress';

describe('<QuizProgress />', () => {
  test('it should mount', () => {
    render(<QuizProgress />);
    
    const quizProgress = screen.getByTestId('QuizProgress');

    expect(quizProgress).toBeInTheDocument();
  });
});