/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

test('renders button Path', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('Appointments');
  expect(linkElement).toBeInTheDocument();

  const linkElement2 = screen.getByText('Settings');
  expect(linkElement2).toBeInTheDocument();

  const linkElement3 = screen.getByText('Chat');
  expect(linkElement3).toBeInTheDocument();

  const linkElement4 = screen.getByText('Logout');
  expect(linkElement4).toBeInTheDocument();

  const text = screen.getByText('Your Analytics');
  expect(text).toBeInTheDocument();

  const text2 = screen.getByText('Scheduled Appointments');
  expect(text2).toBeInTheDocument();
});
