// client/src/tests/unit/BugItem.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { jest, test, expect } from '@jest/globals'; // ✅ Required in ESM mode

const BugItem = ({ bug, onUpdate, onDelete }) => {
  return (
    <div data-testid={`bug-${bug._id}`}>
      <h3>{bug.title}</h3>
      <p>{bug.description}</p>
      <span>Status: {bug.status}</span>
      <button onClick={() => onUpdate(bug._id, 'resolved')}>Resolve</button>
      <button onClick={() => onDelete(bug._id)}>Delete</button>
    </div>
  );
};

describe('BugItem', () => {
  const mockBug = {
    _id: '1',
    title: 'Crash on startup',
    description: 'App closes immediately',
    status: 'open',
  };

  test('displays bug title, description, and status', () => {
    render(<BugItem bug={mockBug} onUpdate={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Crash on startup')).toBeInTheDocument();
    expect(screen.getByText('App closes immediately')).toBeInTheDocument();
    expect(screen.getByText('Status: open')).toBeInTheDocument();
  });

  test('calls onUpdate when Resolve is clicked', () => {
    const mockUpdate = jest.fn(); // ✅ Now defined
    render(<BugItem bug={mockBug} onUpdate={mockUpdate} onDelete={() => {}} />);

    fireEvent.click(screen.getByText('Resolve'));
    expect(mockUpdate).toHaveBeenCalledWith('1', 'resolved');
  });

  test('calls onDelete when Delete is clicked', () => {
    const mockDelete = jest.fn(); // ✅ Now defined
    render(<BugItem bug={mockBug} onUpdate={() => {}} onDelete={mockDelete} />);

    fireEvent.click(screen.getByText('Delete'));
    expect(mockDelete).toHaveBeenCalledWith('1');
  });
});