import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ForceLayout from './ForceLayout';

describe('<ForceLayout />', () => {
  test('it should mount', () => {
    render(<ForceLayout />);
    
    const forceLayout = screen.getByTestId('ForceLayout');

    expect(forceLayout).toBeInTheDocument();
  });
});