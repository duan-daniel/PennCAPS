import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import Header from './Header';
import {
  getUserChats,
  getChats,
  getAllChatMessages,
  checkUserSession,
  getUsers,
} from '../modules/api';
import ChatList from './ChatList';
import ChatMessages from './ChatMessages';

function Chat() {
  const user = useRef('');
  const [userChats, setUserChats] = useState([]);
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);

  const [userChat, setUserChat] = useState('');
  const [chatId, setChatId] = useState(0);
  const [messages, setChatMessages] = useState([]);

  useEffect(async () => {
    const userInSession = await checkUserSession();
    user.current = userInSession;
    const result = await getUserChats(user.current);
    setUserChats(result);
    const resultChats = await getChats(user.current);
    setChats(resultChats);
    const resultMessages = await getAllChatMessages();
    setChatMessages(resultMessages);
    const resultUsers = await getUsers();
    console.log(resultUsers);
    setUsers(resultUsers);

    const intervalID = setInterval(async () => {
      const result2 = await getUserChats(user.current);
      setUserChats(result2);
      const resultChats2 = await getChats(user.current);
      setChats(resultChats2);
      const resultMessages2 = await getAllChatMessages();
      setChatMessages(resultMessages2);
      const resultUsers2 = await getUsers();
      console.log(resultUsers2);
      setUsers(resultUsers2);
    }, 2000);

    return () => clearInterval(intervalID);
  }, []);

  useEffect(async () => {
    if (userChat === '' && userChats.length > 0 && chats.length > 0) {
      setChatId(chats[0].value);
      setUserChat(chats[0].key);
    }
  }, [userChats]);

  return (
    <div>
      <Header />
      <Container>
        <h3>Chats</h3>
        <Row>
          <Col xs={4} style={{ paddingRight: '1.5rem' }}>
            <ChatList
              user={user.current}
              userChats={userChats}
              chats={chats}
              setChatId={setChatId}
              userChat={userChat}
              setUserChat={setUserChat}
              users={users}
            />
          </Col>
          <Col style={{ paddingTop: '2rem', paddingLeft: '1.5rem' }}>
            <ChatMessages
              user={user.current}
              chatId={chatId}
              userChat={userChat}
              messages={messages}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Chat;

// {/* <div style={{
//   backgroundColor: '#ccc', height: '100vh', width: '1px', padding: '0',
// }} */}
