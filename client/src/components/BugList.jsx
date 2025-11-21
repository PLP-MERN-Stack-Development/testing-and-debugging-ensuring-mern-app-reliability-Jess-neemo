// client/src/components/BugList.jsx
import React from 'react';
import BugItem from './BugItem.jsx';

/**
 * Renders a list of bugs with update and delete actions.
 * 
 * @param {Object} props
 * @param {Array} props.bugs - Array of bug objects from the backend
 * @param {Function} props.onUpdate - Callback to update bug status (id, newStatus)
 * @param {Function} props.onDelete - Callback to delete a bug (id)
 */
export default function BugList({ bugs = [], onUpdate, onDelete }) {
  // Defensive: ensure bugs is always an array
  if (!Array.isArray(bugs)) {
    console.error('BugList received non-array bugs:', bugs);
    return <p className="text-red-500 font-medium">❌ Error: Invalid bug data format</p>;
  }

  // Empty state
  if (bugs.length === 0) {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-500 italic">📭 No bugs reported yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Reported Bugs ({bugs.length})</h2>
      <div className="space-y-3">
        {bugs.map((bug) => {
          // Skip invalid entries
          if (!bug || !bug._id) {
            console.warn('BugList: Skipping invalid bug entry:', bug);
            return null;
          }

          return (
            <BugItem
              key={bug._id}
              bug={bug}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}