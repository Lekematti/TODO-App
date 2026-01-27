import { test, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

test('renders TODO heading', () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [],
  }));
  render(<App />);
  const heading = screen.getByText(/todo/i);
  expect(heading).toBeInTheDocument();
});

test('renders todos from API response', async () => {
  const mockTodos = [
    { id: 1, text: 'Test Todo 1', done: false },
    { id: 2, text: 'Test Todo 2', done: true },
  ];

  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => mockTodos,
  }));

  render(<App />);

  expect(await screen.findByText('Test Todo 1')).toBeInTheDocument();
  expect(await screen.findByText('Test Todo 2')).toBeInTheDocument();
});

test('logs error when fetching todos fails', async () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Fetch failed')));
  
  render(<App />);

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching todos:', 
      expect.any(Error));
  });

  consoleSpy.mockRestore();
});

test('adds a new todo', async () => {
  const mockFetch = vi.fn()
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 3, text: 'New Todo from test', done: false }),
    });

  vi.stubGlobal('fetch', mockFetch);

  const { container } = render(<App />);

  const input = container.querySelector('input[type="text"]');
  const addButton = container.querySelector('button[type="submit"]');

  fireEvent.change(input, { target: { value: 'New Todo from test' } });
  fireEvent.click(addButton);

  expect(await screen.findByText('New Todo from test')).toBeInTheDocument();
});

test('toggles todo done status', async () => {
  const mockFetch = vi.fn()
    .mockResolvedValueOnce({
      ok: true, 
      json: async () => [{ id: 1, text: 'Toggle Test Todo', done: false }],
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, text: 'Toggle Test Todo', done: true }),
    });
  vi.stubGlobal('fetch', mockFetch);
  render(<App />);

  const toggleButton = await screen.findByText('Toggle Test Todo');
  const noteElement = toggleButton.closest('.note');
  expect(noteElement).not.toHaveClass('done');

  fireEvent.click(toggleButton);

  await waitFor(() => {
    expect(noteElement).toHaveClass('done');
  });
});

test('edits an existing todo', async () => {
  const mockFetch = vi.fn()
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, text: 'Old text', done: false }],
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, text: 'Edited text', done: false }),
    });

  vi.stubGlobal('fetch', mockFetch);

  const { container } = render(<App />);

  await screen.findByText('Old text');

  const editButtons = container.querySelectorAll('.note-actions button');
  const editButton = editButtons[0]; 
  fireEvent.click(editButton);

  await waitFor(() => {
    expect(container.querySelector('textarea')).not.toBeNull();
  });

  const textarea = container.querySelector('textarea');
  fireEvent.change(textarea, { target: { value: 'Edited text' } });

  const saveButton = container.querySelector('.note-actions button');
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(screen.queryByText('Old text')).toBeNull();
    expect(screen.getByText('Edited text')).toBeInTheDocument();
  });
});

test('deletes a todo', async () => {
  const mockFetch = vi.fn()
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, text: 'Todo to be deleted', done: false }],
    })

    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

  vi.stubGlobal('fetch', mockFetch);

  const { container } = render(<App />);
  await screen.findByText('Todo to be deleted');

  const deleteButton = Array.from(
    container.querySelectorAll('.note-actions button')
  ).find(btn => btn.textContent === 'Delete');
  fireEvent.click(deleteButton);
  
  await waitFor(() => {
    expect(screen.queryByText('Todo to be deleted')).toBeNull();
  });
})