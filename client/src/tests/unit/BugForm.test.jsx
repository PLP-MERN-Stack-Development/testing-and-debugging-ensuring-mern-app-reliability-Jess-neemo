// client/src/tests/unit/BugForm.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Import Jest globals for ESM
import { jest, test, expect } from '@jest/globals';

// Inline mock component (replace with import when ready)
const BugForm = ({ onAddBug }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onAddBug({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} data-testid="bug-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Bug title"
        data-testid="title-input"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        data-testid="description-input"
      />
      <button type="submit">Report Bug</button>
    </form>
  );
};

test('renders form with inputs and button', () => {
  render(<BugForm onAddBug={() => {}} />);
  expect(screen.getByPlaceholderText('Bug title')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  expect(screen.getByText('Report Bug')).toBeInTheDocument();
});

test('calls onAddBug with valid input', () => {
  const mockAddBug = jest.fn(); // ✅ Now works!
  render(<BugForm onAddBug={mockAddBug} />);

  fireEvent.change(screen.getByPlaceholderText('Bug title'), { target: { value: 'Login fails' } });
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'User cannot log in' } });
  fireEvent.click(screen.getByText('Report Bug'));

  expect(mockAddBug).toHaveBeenCalledWith({
    title: 'Login fails',
    description: 'User cannot log in',
  });
});

test('does not call onAddBug with empty title', () => {
  const mockAddBug = jest.fn();
  render(<BugForm onAddBug={mockAddBug} />);

  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'desc' } });
  fireEvent.click(screen.getByText('Report Bug'));

  expect(mockAddBug).not.toHaveBeenCalled();
});