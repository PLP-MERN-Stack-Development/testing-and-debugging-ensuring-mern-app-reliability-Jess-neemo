// client/src/App.jsx
import { useState, useEffect } from 'react';
import BugForm from './components/BugForm.jsx';
import BugList from './components/BugList.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

export default function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBugs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/bugs');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      }
      const data = await res.json();
      setBugs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load bugs:', err);
      setError('Failed to load bugs. Check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const addBug = async (bugData) => {
    try {
      const res = await fetch('/api/bugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bugData),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      }
      await fetchBugs(); // Refetch after success
    } catch (err) {
      console.error('Failed to add bug:', err);
      alert('Failed to submit bug. Please try again.');
    }
  };

  const updateBugStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/bugs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchBugs();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update bug.');
    }
  };

  const deleteBug = async (id) => {
    try {
      const res = await fetch(`/api/bugs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchBugs();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete bug.');
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  // ✅ Show loading, error, or list
  if (loading) {
    return <div className="p-4 text-center text-lg">Loading bugs...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">🐞 Bug Tracker</h1>
      <BugForm onAddBug={addBug} />
      <ErrorBoundary>
        <BugList
          bugs={bugs}
          onUpdate={updateBugStatus}
          onDelete={deleteBug}
        />
      </ErrorBoundary>
    </div>
  );
}