import express from 'express';
import cors from 'cors';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from './db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/todos', (req, res) => {
  const todos = getAllTodos();
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body || {};
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'text is required' });
  }
  const todo = createTodo(text.trim());
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'invalid id' });
  }
  const { text, done } = req.body || {};

  const updated = updateTodo(id, { text, done });
  if (!updated) {
    return res.status(404).json({ error: 'todo not found' });
  }
  res.json(updated);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'invalid id' });
  }

  const ok = deleteTodo(id);
  if (!ok) {
    return res.status(404).json({ error: 'todo not found' });
  }
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
