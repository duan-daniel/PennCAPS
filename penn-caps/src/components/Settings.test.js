/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Settings from './Settings';

test('renders settings password text input', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Settings />} />
      </Routes>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText('Password');
  expect(linkElement).toBeInTheDocument();

  const linkElement2 = screen.getByText('Update');
  expect(linkElement2).toBeInTheDocument();

  const linkElement3 = screen.getByText('Update Settings for');
  expect(linkElement3).toBeInTheDocument();
});

// test('renders settings submit button ', () => {
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Settings />} />
//       </Routes>
//     </BrowserRouter>,
//   );
//   const linkElement = screen.getByText('Update');
//   expect(linkElement).toBeInTheDocument();
// });

// test('renders settings title text ', () => {
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Settings />} />
//       </Routes>
//     </BrowserRouter>,
//   );
//   const linkElement = screen.getByText('Update Settings for');
//   expect(linkElement).toBeInTheDocument();
// });
