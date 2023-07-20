import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Form,
} from 'react-bootstrap';
import {
  sendChatMessage,
} from '../modules/api';
import '../css/Chat.css';

function ChatMessages({
  user, userChat, messages, chatId,
}) {
  const [newMessage, setNewMessage] = useState('');

  async function sendMessage() {
    if (newMessage !== '') {
      await sendChatMessage(chatId, user, newMessage);
      setNewMessage('');
    }
  }

  return (
    <div>
      {
        userChat !== '' ? (
          <div>
            <h4>{userChat}</h4>
            <div className="scrollable">
              {
                messages.map((m) => (
                  <div>
                    {
                      m.id === chatId ? (
                        <div>
                          {
                            m.sender === user ? (
                              <p style={{
                                display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-start', paddingRight: '1rem',
                              }}
                              >
                                {m.message}
                              </p>
                            ) : (
                              <p style={{ paddingLeft: '1rem' }}>{m.message}</p>
                            )
                          }
                        </div>
                      ) : null
                    }
                  </div>
                ))
              }
            </div>
            <Form className="form center">
              <Row style={{ width: '100%' }}>
                <Col xs={10} className="send-textbox">
                  <Form.Group>
                    <Form.Control type="text" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} placeholder="Type a message" />
                  </Form.Group>
                </Col>
                <Col>
                  <Button onClick={() => sendMessage()} className="btn-login">Send</Button>
                </Col>
              </Row>
            </Form>
          </div>
        ) : null
      }
    </div>
  );
}

export default ChatMessages;

// {
//     m.sender === user ? (
//       <p style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-start' }}>
//         {m.message}
//       </p>
//     ) : (
//       <p>{m.message}</p>
//     )
//   }
