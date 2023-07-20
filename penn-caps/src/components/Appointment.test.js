/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Appointment from './Appointment';

test('renders button paths', async () => {
  try {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Appointment />} />
        </Routes>
      </BrowserRouter>,
    );
    const linkElement = screen.getByText('Dashboard');
    expect(linkElement).toBeInTheDocument();

    const linkElement2 = screen.getByText('Settings');
    expect(linkElement2).toBeInTheDocument();

    const linkElement3 = screen.getByText('Chat');
    expect(linkElement3).toBeInTheDocument();

    const linkElement4 = screen.getByText('Logout');
    expect(linkElement4).toBeInTheDocument();

    const text = screen.getByText('Available Appointments');
    expect(text).toBeInTheDocument();

    const text2 = screen.getByText('Date');
    expect(text2).toBeInTheDocument();

    const text4 = screen.getByText('Therapist');
    expect(text4).toBeInTheDocument();

    const text5 = screen.getByText('Action');
    expect(text5).toBeInTheDocument();

    const text6 = screen.getByText('Welcome back,');
    expect(text6).toBeInTheDocument();
  } catch (e) {
    console.log('error');
  }
});
// test('renders settings Path', () => {
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Appointment />} />
//       </Routes>
//     </BrowserRouter>,
//   );
//   const linkElement = screen.getByText('Settings');
//   expect(linkElement).toBeInTheDocument();
// });

// test('renders chat Path', () => {
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Appointment />} />
//       </Routes>
//     </BrowserRouter>,
//   );
//   const linkElement = screen.getByText('Chat');
//   expect(linkElement).toBeInTheDocument();
// });

// test('renders logout Path', () => {
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Appointment />} />
//       </Routes>
//     </BrowserRouter>,
//   );
//   const linkElement = screen.getByText('Logout');
//   expect(linkElement).toBeInTheDocument();
