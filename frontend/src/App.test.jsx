import { test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App.jsx';

test('renders TODO heading', () => {
  render(<App />);
  const heading = screen.getByText(/todo/i);
  expect(heading).toBeInTheDocument();
});

test('renders todos from API response', async () => {
  const mockTodos = [
    { id: 1, text: 'Test Todo 1', done: false },
    { id: 2, text: 'Test Todo 2', done: true },
  ];

  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => mockTodos,
  });

  render(<App />);

  expect(await screen.findByText('Test Todo 1')).toBeInTheDocument();
  expect(await screen.findByText('Test Todo 2')).toBeInTheDocument();
});

test('logs error when fetching todos fails', async () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  
  globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));
  
  render(<App />);

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching todos:', 
      expect.any(Error));
  });

  consoleSpy.mockRestore();
});