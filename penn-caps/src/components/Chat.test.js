/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './Chat';

test('renders Chats Path', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('Chats');
  expect(linkElement).toBeInTheDocument();
});

// test('renders About Us Path', () => {
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </BrowserRouter>,
//   );
//   const linkElement = screen.getByText('About Us');
//   expect(linkElement).toBeInTheDocument();
// });

// test('renders Resources Path', () => {
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </BrowserRouter>,
//   );
//   const linkElement = screen.getByText('Resources');
//   expect(linkElement).toBeInTheDocument();
// });

// test('renders Get Started', () => {
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </BrowserRouter>,
//   );
//   const linkElement = screen.getByText('Get Started');
//   expect(linkElement).toBeInTheDocument();
// });

// test('renders Welcome to Student Counseling link', () => {
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </BrowserRouter>,
//   );
//   const linkElement = screen.getByText('Welcome to Student Counseling');
//   expect(linkElement).toBeInTheDocument();
// });
