import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders TODO heading', () => {
  render(<App />);
  const heading = screen.getByText(/todo/i); // tai tarkempi teksti
  expect(heading).toBeInTheDocument();
});