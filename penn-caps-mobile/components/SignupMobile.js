/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, StyleSheet, Text, TextInput, ScrollView, Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import logo from '../assets/logo.png';
import { addUser, usernameExists } from '../modules/api';

function SignupMobile({ navigation }) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [pennId, setPennId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState('');

  async function addUserName(name) {
    try {
      const l = JSON.parse(await AsyncStorage.getItem('users'));
      l.push({
        pennid: name,
      });
      const elem = l.find((e) => e.pennid === name);
      await AsyncStorage.setItem('users', JSON.stringify(l));
      return elem;
    } catch (err) {
      throw new Error('an error!');
    }
  }

  function isAlphaNumeric(str) {
    let code;
    let i;
    let len;

    for (i = 0, len = str.length; i < len; i += 1) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) // numeric (0-9)
          && !(code > 64 && code < 91) // upper alpha (A-Z)
          && !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
      }
    }
    return true;
  }

  const handleSignupPress = async () => {
    if (!firstName || !lastName || !pennId || !password) {
      setMessage('Fill in all required fields');
      setError(true);
      setTimeout(() => { setError(false); }, 2000);
    } else {
      const exists = await usernameExists(pennId);
      const alpha = isAlphaNumeric(password);
      if (exists) {
        setMessage('username already exists!');
        setError(true);
        setTimeout(() => { setError(false); }, 2000);
      } else if (!alpha) {
        setMessage('Please enter an alphanumeric password!');
        setError(true);
        setTimeout(() => { setError(false); }, 2000);
      } else {
        const user = await addUser(pennId, password, firstName, lastName);
        await addUserName(user.pennid);
        console.log('navigate to appointments');
        console.log(user);
        navigation.navigate('Appointments', {
          pennid: user.pennid,
          password: user.password,
          firstname: user.firstname,
          lastname: user.lastname,
        });
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={logo}
          style={{
            width: '1000%',
            height: 100,
            resizeMode: 'contain',
            margin: 30,
          }}
        />
      </View>
      <TextInput
        placeholder="First Name"
        onChangeText={(FirstName) => setFirstName(FirstName)}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        onChangeText={(LastName) => setLastName(LastName)}
        style={styles.input}
      />
      <TextInput
        placeholder="Penn ID"
        onChangeText={(id) => setPennId(id)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(newPassword) => setPassword(newPassword)}
        style={styles.input}
      />
      {error ? <Text style={styles.errorTextStyle}>{message}</Text> : null}
      <Button style={styles.button} onPress={handleSignupPress} mode="contained" dark="true">
        Sign Up
      </Button>
      <Text
        style={styles.registerTextStyle}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account ? Log in
      </Text>
    </ScrollView>
  );
}
export default SignupMobile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 36,
    marginRight: 36,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    padding: 12,
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  image: {
    width: 120,
    height: 120,
    borderColor: 'orange',
    borderWidth: 2,
    borderRadius: 100,
  },
  registerTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    height: 50,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
