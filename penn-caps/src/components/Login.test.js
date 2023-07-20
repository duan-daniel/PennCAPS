/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';

test('renders login button', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('Log In');
  expect(linkElement).toBeInTheDocument();
});

test('renders signup Link', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('Sign Up!');
  expect(linkElement).toBeInTheDocument();
});

test('renders welcome text', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('Welcome!');
  expect(linkElement).toBeInTheDocument();
});

test('PennID form', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('Penn ID');
  expect(linkElement).toBeInTheDocument();
});

test('Password form', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('Password');
  expect(linkElement).toBeInTheDocument();
});
