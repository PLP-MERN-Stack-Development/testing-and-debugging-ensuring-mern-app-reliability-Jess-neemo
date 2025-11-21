import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { jest, test, expect } from '@jest/globals';

const Button = ({ children, onClick, disabled = false }) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

test('renders button with correct text', () => {
  render(<Button>Submit</Button>); // ✅ React is imported
  expect(screen.getByText('Submit')).toBeInTheDocument();
});

test('is disabled when disabled prop is true', () => {
  render(<Button disabled>Disabled</Button>);
  expect(screen.getByText('Disabled')).toBeDisabled();
});