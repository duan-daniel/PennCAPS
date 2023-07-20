import React, { useRef, useState, useEffect } from 'react';
import './css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Appointment from './components/Appointment';
import Settings from './components/Settings';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import {
  getUserChatIds,
  checkUserSession,
  getAllChatMessages,
} from './modules/api';

function App() {
  const user = useRef('');
  const [userChatIds, setUserChatIds] = useState([]);
  const [messages, setChatMessages] = useState([]);
  const [messages2, setChatMessages2] = useState([]);

  const createNotification = (m) => {
    NotificationManager.info(`${m.sender}: ${m.message}`);
  };

  useEffect(async () => {
    const intervalID = setInterval(async () => {
      const userInSession = await checkUserSession();
      user.current = userInSession;
      if (user.current !== '') {
        const result = await getUserChatIds(user.current);
        setUserChatIds(result);
        const resultMessages = await getAllChatMessages();
        setChatMessages(resultMessages);
      }
    }, 2000);

    return () => clearInterval(intervalID);
  }, []);

  useEffect(async () => {
    setChatMessages2(messages);
    if (messages.length !== messages2.length && messages2.length !== 0) {
      console.log('new messages incoming');
      for (let i = messages2.length; i < messages.length; i += 1) {
        if (userChatIds.includes(messages[i].id) && messages[i].sender !== user.current) {
          console.log(messages[i]);
          createNotification(messages[i]);
        } else {
          console.log('incoming message for another user');
        }
      }
    }
  }, [messages]);

  return (
    <div className="App">
      <NotificationContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
