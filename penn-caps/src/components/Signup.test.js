/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';

test('renders Signup button', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('Get Started');
  expect(linkElement).toBeInTheDocument();
});

test('renders Login Link', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('Log In!');
  expect(linkElement).toBeInTheDocument();
});

test('renders welcome text', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('Create Account');
  expect(linkElement).toBeInTheDocument();
});

test('PennID form', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
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
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('Password');
  expect(linkElement).toBeInTheDocument();
});

test('First Name form', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('First Name');
  expect(linkElement).toBeInTheDocument();
});

test('Last Name form', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('Last Name');
  expect(linkElement).toBeInTheDocument();
});
