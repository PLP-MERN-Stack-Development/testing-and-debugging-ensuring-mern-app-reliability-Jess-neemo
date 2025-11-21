// client/src/tests/integration/BugList.test.jsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Reuse BugItem
const BugItem = ({ bug, onUpdate, onDelete }) => (
  <div data-testid={`bug-${bug._id}`}>
    <h3>{bug.title}</h3>
    <button onClick={() => onDelete(bug._id)}>Delete</button>
  </div>
);

// BugList
const BugList = ({ bugs, onUpdate, onDelete }) => {
  if (bugs.length === 0) {
    return <div data-testid="empty-message">No bugs reported.</div>;
  }
  return (
    <div data-testid="bug-list">
      {bugs.map((bug) => (
        <BugItem key={bug._id} bug={bug} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
};

describe('BugList', () => {
  test('shows empty message when no bugs', () => {
    render(<BugList bugs={[]} onUpdate={() => {}} onDelete={() => {}} />);
    expect(screen.getByTestId('empty-message')).toHaveTextContent('No bugs reported.');
  });

  test('renders one bug item when bugs array has one bug', () => {
    const bugs = [{ _id: '1', title: 'Test bug', description: 'test', status: 'open' }];
    render(<BugList bugs={bugs} onUpdate={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Test bug')).toBeInTheDocument();
    expect(screen.getByTestId('bug-1')).toBeInTheDocument();
  });

  test('renders multiple bug items', () => {
    const bugs = [
      { _id: '1', title: 'Bug 1', description: 'desc1', status: 'open' },
      { _id: '2', title: 'Bug 2', description: 'desc2', status: 'in-progress' },
    ];
    render(<BugList bugs={bugs} onUpdate={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Bug 1')).toBeInTheDocument();
    expect(screen.getByText('Bug 2')).toBeInTheDocument();
  });
});