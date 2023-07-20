import React from 'react';
import {
  View, Text, StyleSheet, TextInput,
} from 'react-native';
import { Button } from 'react-native-paper';
import {
  getUserChats,
  getChats,
  getUserId,
  latestChatId,
  startNewChat,
  getUsers,
} from '../modules/api';

const styles = StyleSheet.create({
  body: {
    margin: 10,
  },

  title: {
    fontFamily: 'Inter',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  startChatBtn: {
    marginBottom: 10,
  },
  startNewChatBtn: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    padding: 6,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 30,
  },
});

function ChatList({ navigation }) {
  const user = React.useRef('');
  const [userChats, setUserChats] = React.useState([]);
  const [chats, setChats] = React.useState([]);
  const [newUser, setNewUser] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState('');
  const [users, setUsers] = React.useState([]);

  console.log(newUser);
  const addChat = () => {
    console.log('add chat');
    setShow(true);
  };

  const startChat = async () => {
    if (newUser !== '') {
      if (users.includes(newUser) && !userChats.includes(newUser) && newUser !== user.current) {
        const latestId = await latestChatId();
        await startNewChat(latestId + 1, [user.current, newUser]);
        setShow(false);
        setError('');
      } else if (newUser === user.current) {
        setError('cant add own user');
      } else if (userChats.includes(newUser)) {
        setError('user already added');
      } else {
        setError('no such user');
      }
      setNewUser('');
    }
  };

  const closeChat = () => {
    console.log('close chat');
    setShow(false);
  };

  React.useEffect(async () => {
    user.current = await getUserId();
    const result = await getUserChats(user.current);
    setUserChats(result);
    const resultChats = await getChats(user.current);
    setChats(resultChats);
    const resultUsers = await getUsers();
    console.log(resultUsers);
    setUsers(resultUsers);

    const intervalID = setInterval(async () => {
      const result2 = await getUserChats(user.current);
      setUserChats(result2);
      const resultChats2 = await getChats(user.current);
      setChats(resultChats2);
      const resultUsers2 = await getUsers();
      console.log(resultUsers2);
      setUsers(resultUsers2);
    }, 2000);

    return () => clearInterval(intervalID);
  }, []);

  const setChat = (e, u) => {
    let currentChatId = 0;
    for (let i = 0; i < chats.length; i += 1) {
      if (chats[i].key === u) {
        currentChatId = chats[i].value;
      }
    }
    navigation.navigate('Chats', {
      user: user.current,
      userChat: u,
      chatId: currentChatId,
    });
  };

  return (
    <View style={styles.body}>
      <Text style={styles.title}>Chats</Text>
      <View className="d-grid gap-2" style={{ marginTop: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
        <Button variant="info" onPress={addChat} style={styles.startNewChatBtn} mode="contained" dark="true"> Start new chat + </Button>
      </View>
      {userChats.map((u) => (
        <Button key={u} className="user-btn" onPress={(e) => setChat(e, u)}>{u}</Button>
      ))}
      {
        show ? (
          <View id="popup">
            <View
              className="overlay"
              style={{
                position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: '#000', zIndex: '5', opacity: '0.4',
              }}
            />
            <View
              className="content"
              style={{
                position: 'absolute', zIndex: '10', background: '#fff', top: '50%', left: '50%', width: '20rem', height: '16rem', transform: 'translate(-50%, -50%)',
              }}
            >
              <View style={{ marginLeft: '1rem', marginTop: '2rem', width: '18rem' }}>
                <Text>Enter user to chat:</Text>
                <TextInput
                  onChangeText={(usr) => setNewUser(usr)}
                  style={styles.input}
                  value={newUser}
                />
                <div className="d-grid gap-2">
                  <Button style={styles.startChatBtn} onPress={startChat} size="lg" mode="contained" dark="true"> Start new chat </Button>
                  <Button style={styles.closeBtn} size="lg" onPress={closeChat} mode="outlined" dark="false"> Close </Button>
                </div>
                {
                  error !== '' ? (
                    <Text className="errorMessage center" style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</Text>
                  ) : null
                }
              </View>
            </View>
          </View>
        ) : null
      }
    </View>
  );
}

export default ChatList;
