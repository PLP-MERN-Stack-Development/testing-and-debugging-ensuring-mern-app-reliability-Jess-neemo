// client/src/App.jsx
import { useState, useEffect } from 'react';
import BugForm from './components/BugForm.jsx';
import BugList from './components/BugList.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

export default function App() {
  const [bugs, setBugs] = useState([]);

  // ✅ DEFINE addBug
  const addBug = async (bugData) => {
    try {
      const res = await fetch('/api/bugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bugData),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Create bug failed:', res.status, errText);
        return;
      }

      // Refetch list
      await fetchBugs();
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  // ✅ DEFINE fetchBugs
  const fetchBugs = async () => {
    try {
      const res = await fetch('/api/bugs');
      const data = res.ok ? await res.json() : [];
      setBugs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch bugs error:', err);
      setBugs([]);
    }
  };

  // ✅ Other functions: updateBugStatus, deleteBug (define them if used)

  useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">🐞 Bug Tracker</h1>
      {/* ✅ Now addBug is defined */}
      <BugForm onAddBug={addBug} />
      <ErrorBoundary>
        <BugList
          bugs={bugs}
          onUpdate={(id, status) => {}} // define if used
          onDelete={(id) => {}}         // define if used
        />
      </ErrorBoundary>
    </div>
  );
}