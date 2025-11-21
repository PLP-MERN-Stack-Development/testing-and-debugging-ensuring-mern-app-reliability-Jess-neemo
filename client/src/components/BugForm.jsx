import { useState } from 'react';

export default function BugForm({ onAddBug }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onAddBug({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Bug title"
        className="w-full p-2 mb-2 border"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 mb-2 border"
        rows="3"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Report Bug
      </button>
    </form>
  );
}