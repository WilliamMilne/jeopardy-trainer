import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserDashboard from './UserDashboard';

describe('<UserDashboard />', () => {
  test('it should mount', () => {
    render(<UserDashboard />);
    
    const userDashboard = screen.getByTestId('UserDashboard');

    expect(userDashboard).toBeInTheDocument();
  });
});