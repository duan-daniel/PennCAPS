import React, { useState } from 'react';
import {
  Card, Button, Form,
} from 'react-bootstrap';
import {
  startNewChat,
  latestChatId,
} from '../modules/api';
import '../css/Chat.css';

function ChatList({
  user, userChats, chats, setChatId, setUserChat, users,
}) {
  const [newUser, setNewUser] = useState('');
  const [error, setError] = useState('');

  const addChat = () => {
    document.getElementById('popup').style.display = 'block';
  };

  const startChat = async () => {
    if (newUser !== '') {
      if (users.includes(newUser) && !userChats.includes(newUser) && newUser !== user) {
        const latestId = await latestChatId();
        await startNewChat(latestId + 1, [user, newUser]);
        document.getElementById('popup').style.display = 'none';
        setError('');
      } else if (newUser === user) {
        setError('cant add own user');
      } else if (userChats.includes(newUser)) {
        setError('user already added');
      } else {
        setError('no such user');
      }
      setNewUser('');
    }
  };

  const closeChat = async () => {
    document.getElementById('popup').style.display = 'none';
    setError('');
    setNewUser('');
  };

  const setChat = (e, u) => {
    setUserChat(u);
    for (let i = 0; i < chats.length; i += 1) {
      if (chats[i].key === u) {
        setChatId(chats[i].value);
      }
    }
  };

  return (
    <div>
      <h3>{user}</h3>
      <div className="d-grid gap-2" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Button variant="info" onClick={addChat} size="lg"> Start new chat + </Button>
      </div>

      {userChats?.map((u) => (
        <Card key={u} body style={{ marginBottom: '1rem' }} className="center user-card">
          <Button className="user-btn" onClick={(e) => setChat(e, u)}>{u}</Button>
        </Card>
      ))}

      <div id="popup" style={{ display: 'none' }}>
        <div
          className="overlay"
          style={{
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: '#000', zIndex: '5', opacity: '0.4',
          }}
        />
        <div
          className="content"
          style={{
            position: 'absolute', zIndex: '10', background: '#fff', top: '50%', left: '50%', width: '29rem', height: '20rem', transform: 'translate(-50%, -50%)',
          }}
        >
          <Form style={{ marginLeft: '2rem', marginTop: '1rem', width: '25rem' }}>
            <Form.Group>
              <Form.Label> Enter user to chat: </Form.Label>
              <Form.Control id="input" value={newUser} onChange={(e) => setNewUser(e.target.value)} />
              <br />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="info" onClick={startChat} size="lg"> Start new chat </Button>
              <Button variant="light" size="lg" onClick={closeChat}> Close </Button>
            </div>
            <br />
            {
              error !== '' ? (
                <p className="errorMessage center">{error}</p>
              ) : null
            }
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
