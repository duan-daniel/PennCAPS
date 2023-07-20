/* eslint-disable no-use-before-define */
/* eslint-disable react/style-prop-object */
import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginMobile from './components/LoginMobile';
import SignupMobile from './components/SignupMobile';
import Appointments from './components/Appointments';
import ChatList from './components/ChatList';
import Chats from './components/Chats';

function Home({ navigation }) {
  function handleLoginButton() {
    navigation.navigate('Login');
  }

  return (
    // eslint-disable-next-line no-use-before-define
    <View style={styles.body}>
      <View>
        <Text style={styles.subtitle}>UNIVERSITY OF PENNSYLVANIA</Text>
        <Text style={styles.title}>Welcome to Counseling and Psychological Services (CAPS)!</Text>
        <View>
          <Text style={styles.description}>
            We are committed to creating an affirming environment based on our values of
            multicultural, multi-disciplinary and inclusive practices, focused on providing care
            to our diverse student body.
          </Text>
          <View style={styles.buttonSection}>
            <Button
              mode="contained"
              dark="true"
              style={styles.homeButton}
              onPress={(e) => handleLoginButton(e)}
            >
              Get Started
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode='none'
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginMobile} />
        <Stack.Screen name="Signup" component={SignupMobile} />
        <Stack.Screen name="Appointments" component={Appointments} />
        <Stack.Screen name="ChatList" component={ChatList} />
        <Stack.Screen name="Chats" component={Chats} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 10,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },

  title: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },

  subtitle: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '400',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 70,
    marginBottom: 20,
  },

  description: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: 'normal',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },

  tablesection: {
    marginLeft: 10,
    marginRight: 10,
  },

  tableText: {
    fontFamily: 'Inter',
    fontSize: 15,
  },

  containerStyle: {
    margin: 20,
    backgroundColor: 'white',
    padding: 20,
  },

  buttonSection: {
    alignItems: 'center',
  },

  homeButton: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    height: 50,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  modalText: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 15,
    margin: 5,
    paddingBottom: 5,
  },
});
