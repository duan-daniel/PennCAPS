/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatList from './ChatList';

test('renders new chat button', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatList />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('Start new chat +');
  expect(linkElement).toBeInTheDocument();
});
