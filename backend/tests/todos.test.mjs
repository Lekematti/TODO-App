import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import fs from 'node:fs';
import path from 'node:path';
import { app } from '../src/server.js';

const testDbPath = path.join(process.cwd(), 'backend', 'test-todos.sqlite');

// Puhdas testitietokanta ennen ajoa
test.before(() => {
    if (fs.existsSync(testDbPath)) {
        fs.unlinkSync(testDbPath);
    }
});

// GET /api/todos (aluksi tyhjä lista)
test('GET /api/todos returns empty array initially', async () => {
    const res = await request(app).get('/api/todos');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.equal(res.body.length, 0);
});

// POST /api/todos luo uuden todo:n
test('POST /api/todos creates a new todo', async () => {
    const res = await request(app)
        .post('/api/todos')
        .send({ text: 'Test API' })
        .set('Content-Type', 'application/json');

    assert.equal(res.status, 201);
    assert.ok(res.body.id);
    assert.equal(res.body.text, 'Test API');
    assert.equal(res.body.done, false);
});

// PUT /api/todos/:id päivittää todo:n
test('PUT /api/todos/:id updates a todo', async () => {
    const createRes = await request(app)
        .post('/api/todos')
        .send({ text: 'Update me' })
        .set('Content-Type', 'application/json');
    
    const id = createRes.body.id;

    const res = await request(app)
        .put(`/api/todos/${id}`)
        .send({ text: 'Updated', done: true })
        .set('Content-Type', 'application/json');

    assert.equal(res.status, 200);
    assert.equal(res.body.text, 'Updated');
    assert.equal(res.body.done, true);
});

// DELETE /api/todos/:id poistaa todo:n
test('DELETE /api/todos/:id deletes a todo', async () => {
    const createRes = await request(app)
        .post('/api/todos')
        .send({ text: 'Delete me' })
        .set('Content-Type', 'application/json');

    const id = createRes.body.id;

    const delRes = await request(app).delete(`/api/todos/${id}`);
    assert.equal(delRes.status, 204);

    const listRes = await request(app).get('/api/todos');
    const exists = listRes.body.some(t => t.id === id);
    assert.equal(exists, false);
});

