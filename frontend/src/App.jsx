import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [newText, setNewText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchTodos() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (e) {
      console.error('Error fetching todos:', e);
      setError('Error fetching todos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newText.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText.trim() }),
      });
      const created = await res.json();
      setTodos(prev => [created, ...prev]);
      setNewText('');
    } catch {
      setError('Error adding todo');
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' });
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch {
      setError('Error deleting todo');
    }
  }

  function startEdit(todo) {
    setEditingId(todo.id);
    setEditingText(todo.text);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText('');
  }

  async function saveEdit(id) {
    if (!editingText.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editingText.trim() }),
      });
      const updated = await res.json();
      setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
      cancelEdit();
    } catch {
      setError('Error editing todo');
    }
  }

  async function toggleDone(todo) {
    try {
      const res = await fetch(`${API_BASE}/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !todo.done }),
      });
      const updated = await res.json();
      setTodos(prev => prev.map(t => (t.id === todo.id ? updated : t)));
    } catch {
      setError('Error updating todo status');
    }
  }

  return (
    <div className="app-container">
      <h1>Mini TODO</h1>
      <form className="add-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="New task..."
          value={newText}
          onChange={e => setNewText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
      <div className="notes-grid">
        {todos.map(todo => (
          <div key={todo.id} className={`note ${todo.done ? 'done' : ''}`}>
            <div className="note-body">
              {editingId === todo.id ? (
                <textarea
                  value={editingText}
                  onChange={e => setEditingText(e.target.value)}
                />
              ) : (
                <button
                  type="button"
                  className="note-toggle"
                  onClick={() => toggleDone(todo)}
                >
                  {todo.text}
                </button>
              )}
            </div>
            <div className="note-actions">
              {editingId === todo.id ? (
                <>
                  <button onClick={() => saveEdit(todo.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(todo)}>Edit</button>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
