import initSqlJs from 'sql.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '..', 'todos.sqlite');

const SQL = await initSqlJs();

let db;
if (fs.existsSync(DB_FILE)) {
  const fileBuffer = fs.readFileSync(DB_FILE);
  db = new SQL.Database(fileBuffer);
} else {
  db = new SQL.Database();
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      done INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  persist();
}

function persist() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_FILE, buffer);
}

export function getAllTodos() {
  const rows = [];
  const stmt = db.prepare('SELECT id, text, done, created_at FROM todos ORDER BY created_at DESC');
  while (stmt.step()) {
    const row = stmt.getAsObject();
    rows.push({
      ...row,
      done: !!row.done,
    });
  }
  stmt.free();
  return rows;
}

export function createTodo(text) {
  const stmt = db.prepare('INSERT INTO todos (text) VALUES (?);');
  stmt.run([text]);
  stmt.free();

  const select = db.prepare('SELECT id, text, done, created_at FROM todos ORDER BY id DESC LIMIT 1;');
  let row = null;
  if (select.step()) {
    row = select.getAsObject();
  }
  select.free();
  persist();
  if (!row) return null;
  return { ...row, done: !!row.done };
}

export function updateTodo(id, { text, done }) {
  const currentStmt = db.prepare('SELECT id, text, done, created_at FROM todos WHERE id = ?');
  currentStmt.bind([id]);
  let current = null;
  if (currentStmt.step()) {
    current = currentStmt.getAsObject();
  }
  currentStmt.free();
  if (!current) return null;

  const newText = text ?? current.text;
  let newDone = current.done;
  if (typeof done === 'boolean') {
    newDone = done ? 1 : 0;
  }

  const stmt = db.prepare('UPDATE todos SET text = ?, done = ? WHERE id = ?');
  stmt.run([newText, newDone, id]);
  stmt.free();

  const updatedStmt = db.prepare('SELECT id, text, done, created_at FROM todos WHERE id = ?');
  updatedStmt.bind([id]);
  let updated = null;
  if (updatedStmt.step()) {
    updated = updatedStmt.getAsObject();
  }
  updatedStmt.free();
  persist();
  if (!updated) return null;
  return { ...updated, done: !!updated.done };
}

export function deleteTodo(id) {
  const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
  stmt.run([id]);
  const changes = db.getRowsModified();
  stmt.free();
  if (changes > 0) {
    persist();
    return true;
  }
  return false;
}
