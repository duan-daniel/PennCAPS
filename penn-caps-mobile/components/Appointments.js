/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Menu, Appbar, Provider, DataTable, Button,
} from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Dashboard from './Dashboard';
import Settings from './Settings';
import ChatList from './ChatList';
import { searchAppointments, scheduleAppointments, getUserId } from '../modules/api';

const Stack = createStackNavigator();

function Appointment({ navigation }) {
  const [pennId, setPennId] = useState('');
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const appointmentList = useRef([]);

  async function getUsername() {
    setPennId(await getUserId());
  }
  getUsername();

  useEffect(() => {
    async function fetchAppointments() {
      appointmentList.current = await searchAppointments();
      setDataIsLoaded(true);
    }
    fetchAppointments();
  });

  async function makeAppointment(pennid, appointmentid) {
    await scheduleAppointments(pennid, appointmentid);
  }

  return (
    <Provider>
      <View style={styles.body}>
        <Text style={styles.title}>
          Available Appointments for
          {' '}
          {pennId}
        </Text>
        <View style={styles.tablesection}>
          <DataTable style={styles.table}>
            <DataTable.Header>
              <DataTable.Title style={styles.tableText}>Date</DataTable.Title>
              <DataTable.Title>Time</DataTable.Title>
              <DataTable.Title>Therapist</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>

            {dataIsLoaded && (
              appointmentList.current.map((item) => (
                <DataTable.Row key={item.appointmentid}>
                  <DataTable.Cell style={styles.tableText}>{item.date}</DataTable.Cell>
                  <DataTable.Cell>{item.time}</DataTable.Cell>
                  <DataTable.Cell>{item.therapistname}</DataTable.Cell>
                  <DataTable.Cell>
                    <Button
                      disabled={item.pennid !== '0'}
                      mode="contained"
                      dark="true"
                      onPress={() => {
                        makeAppointment(pennId, item.appointmentid);
                        navigation.navigate('Dashboard');
                      }}
                      style={styles.bookButton}
                    >
                      Book
                    </Button>
                  </DataTable.Cell>
                </DataTable.Row>
              ))

            )}
          </DataTable>
        </View>
      </View>
    </Provider>
  );
}

function CustomNavigationBar({ navigation, back }) {
  const [visible, setVisible] = React.useState(false);
  // menu
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <Appbar.Header>
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content title="Penn CAPS" />
        {!back ? (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action icon="menu" color="white" onPress={openMenu} />
            }
          >
            <Menu.Item onPress={() => { navigation.navigate('Dashboard'); }} title="Dashboard" />
            <Menu.Item onPress={() => { navigation.navigate('Settings'); }} title="Settings" />
            <Menu.Item onPress={() => { navigation.navigate('ChatList'); }} title="Chat" />
          </Menu>
        ) : null}
      </Appbar.Header>
    </Provider>
  );
}

export default function SideMenu() {
  return (
    <Stack.Navigator
      initialRouteName="Appointment"
      screenOptions={{
        header: CustomNavigationBar,

      }}
    >
      <Stack.Screen name="Appointment" component={Appointment} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ChatList" component={ChatList} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  body: {
    margin: 10,
  },

  title: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  tablesection: {
    marginLeft: 5,
    marginRight: 5,
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

  modalButton: {
    margin: 5,
  },

  bookButton: {
    width: '100%',
    fontSize: 10,
    marginRight: 0,
  },

  modalText: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 15,
    margin: 5,
    paddingBottom: 5,
  },
});
