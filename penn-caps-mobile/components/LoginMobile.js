/* eslint-disable no-sequences */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, StyleSheet, Text, TextInput, Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import logo from '../assets/logo.png';
import { getUser, usernameExists } from '../modules/api';

function LoginMobile({ navigation }) {
  const [pennId, setPennId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [pwdCounter, setPwdCounter] = React.useState(0);
  const [disabled, setDisabled] = React.useState(false);

  async function initLocalStorage() {
    try {
      if (!(await AsyncStorage.getItem('users'))) {
        await AsyncStorage.setItem('users', JSON.stringify([]));
      }
    } catch (err) {
      throw new Error('an error!');
    }
  }

  async function addUser(name) {
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
  const handleLoginPress = async () => {
    await initLocalStorage();
    if (!pennId || !password) {
      setMessage('Fill in all required fields');
      setError(true);
    } else {
      setError(false);
      const exists = await usernameExists(pennId);
      if (!exists) {
        setMessage('pennid does not exists! Sign up!');
        setError(true);
      } else {
        setError(false);
        if (pwdCounter < 2) {
          const user = await getUser(pennId, password);
          if (user.password === password) {
            await addUser(user.pennid);
            navigation.navigate('Appointments', {
              // pennid: 'hello',
              // pennid: user.pennid,
              // password: user.password,
              // firstname: user.firstname,
              // lastname: user.lastname,
            });
          } else {
            setMessage('incorrect password!');
            setError(true);
            setPwdCounter(pwdCounter + 1);
          }
        } else {
          setMessage('Locked out of your account please wait 1 minute to try again');
          setError(true);
          setDisabled(true);
          setTimeout(() => { setDisabled(false); setPwdCounter(0); setError(false); }, 60000);
        }
      }
    }
  };
  return (
    <View style={styles.container}>
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
        placeholder="Enter your Penn ID"
        keyboardType="email-address"
        onChangeText={(id) => setPennId(id)}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter your password"
        onChangeText={(newPassword) => setPassword(newPassword)}
        style={styles.input}
      />
      {error ? <Text style={styles.errorTextStyle}>{message}</Text> : null}
      <Button style={styles.button} disabled={disabled} onPress={handleLoginPress} mode="contained" dark="true">
        Login
      </Button>
      <Text
        style={styles.registerTextStyle}
        onPress={() => navigation.navigate('Signup')}
      >
        New Here ? Signup
      </Text>
    </View>
  );
}
export default LoginMobile;

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
