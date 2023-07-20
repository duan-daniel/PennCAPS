/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  View, Text, StyleSheet, TextInput,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  getAllChatMessages, sendChatMessage,
} from '../modules/api';

const styles = StyleSheet.create({
  body: {
    margin: 10,
    flex: 1,
  },
  user: {
    fontFamily: 'Inter',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  right: {
    textAlign: 'right',
    marginRight: 10,
    fontFamily: 'Inter',
    fontSize: 15,
  },
  left: {
    marginLeft: 10,
    fontFamily: 'Inter',
    fontSize: 15,
  },
  messageBox: {
    height: '87%',
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    padding: 6,
    width: '95%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
});

function Chats({ route }) {
//   async function getUsername() {
//     setUser(await getUserId());
//   }
//   getUsername();
  const { user, userChat, chatId } = route.params;
  const [messages, setChatMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState('');

  async function sendMessage() {
    if (newMessage !== '') {
      await sendChatMessage(chatId, user, newMessage);
      setNewMessage('');
    }
  }

  React.useEffect(async () => {
    const resultMessages = await getAllChatMessages();
    setChatMessages(resultMessages);

    const intervalID = setInterval(async () => {
      const resultMessages2 = await getAllChatMessages();
      setChatMessages(resultMessages2);
    }, 2000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <View style={styles.body}>
      <Text style={styles.user}>{userChat}</Text>
      <View style={styles.messageBox}>
        {
          messages.map((m, idx) => (
            <View key={idx}>
              {
                m.id === chatId ? (
                  <View>
                    {
                      m.sender === user ? (
                        <Text style={styles.right}>{m.message}</Text>
                      ) : (
                        <Text style={styles.left}>{m.message}</Text>
                      )
                    }
                  </View>
                ) : null
              }
            </View>
          ))
        }
      </View>
      <Grid style={styles.bottom}>
        <Row>
          <Col size={3}>
            <TextInput
              placeholder="Type a message"
              onChangeText={(msg) => setNewMessage(msg)}
              style={styles.input}
              value={newMessage}
            />
          </Col>
          <Col size={1}>
            <Button style={styles.button} onPress={() => sendMessage()} mode="contained" dark="true">
              send
            </Button>
          </Col>
        </Row>
      </Grid>
    </View>
  );
}

export default Chats;
