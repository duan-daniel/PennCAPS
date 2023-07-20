/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-bind */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Provider } from 'react-native-paper';
import { checkUserSession, updateUser } from '../modules/api';

function Settings() {
  async function getUser() {
    try {
      const l = JSON.parse(await AsyncStorage.getItem('users'));
      const elem = l.at(-1);
      return elem.pennid;
    } catch (err) {
      throw new Error('an error!');
    }
  }
  const [password, setPassword] = useState('');
  const [pennId, setPennId] = useState('');
  async function getUsername() {
    setPennId(await getUser());
    // console.log(username);
    // return username;
  }
  getUsername();

  const areAllFieldsFilled = (password !== '');

  function handlePassword(e) {
    setPassword(e);
  }

  const [message, setMessage] = useState(' ');

  async function updateSettings() {
    console.log(pennId);
    await updateUser(pennId, password);
    setMessage('Password Updated!');
  }

  // async function deleteAccount() {
  //   console.log(pennId);
  //   await deleteUser(pennId);
  // }

  useEffect(async () => {
    const result = await checkUserSession();
    console.log(result);
    setPennId(result);
  }, []);

  return (
    <Provider>
      <View className="login-box">
        <Text className="center" style={styles.title}>
          Update Settings for
          {' '}
          {pennId}
          {' '}
        </Text>
        <View style={styles.inputarea}>
          <TextInput
            label="Password"
            style={styles.input}
            value={password}
            onChangeText={handlePassword}
            placeholder="Type New Password"
          />
          <Button disabled={!areAllFieldsFilled} style={styles.button} onPress={updateSettings} mode="contained" dark="true">
            Update Password
          </Button>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      </View>
    </Provider>
  );
}

export default Settings;

const styles = StyleSheet.create({
  body: {
    margin: 10,
    width: '100%',
  },

  messageText: {
    color: 'red',
    marginTop: 10,
  },

  title: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },

  inputarea: {
    alignItems: 'center',
    margin: 20,
  },

  input: {
    width: '100%',
    marginBottom: 10,
  },

  containerStyle: {
    margin: 20,
    backgroundColor: 'white',
    padding: 20,
  },

  modalButton: {
    margin: 5,
  },

  button: {
    width: '100%',
    fontSize: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
});
