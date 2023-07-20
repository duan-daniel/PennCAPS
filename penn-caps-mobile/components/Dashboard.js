/* eslint-disable no-use-before-define */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Provider, DataTable, Button,
} from 'react-native-paper';
import { searchAppointments, scheduleAppointments } from '../modules/api';

async function getUser() {
  try {
    const l = JSON.parse(await AsyncStorage.getItem('users'));
    const elem = l.at(-1);
    return elem.pennid;
  } catch (err) {
    throw new Error('an error!');
  }
}

export default function Dashboard() {
  const [pennId, setPennId] = useState('');
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const appointmentList = useRef([]);

  async function getUsername() {
    setPennId(await getUser());
  }
  getUsername();

  useEffect(() => {
    async function fetchAppointments() {
      appointmentList.current = await searchAppointments();
      setDataIsLoaded(true);
    }
    fetchAppointments();
  });

  async function cancelAppointment(appointmentid) {
    await scheduleAppointments('0', appointmentid);
  }

  return (
    <Provider>
      <View style={styles.body}>
        <View>
          <Text style={styles.title}>
            Analytics for
            {' '}
            {pennId}
          </Text>
          <View style={styles.tablesection}>
            {dataIsLoaded && (
            <DataTable style={styles.table}>
              <DataTable.Header>
                <DataTable.Title style={styles.tableText}>Metrics</DataTable.Title>
                <DataTable.Title>Value</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableText}>Total Sessions Scheduled</DataTable.Cell>
                <DataTable.Cell>
                  {
                    appointmentList.current.filter((item) => item.pennid === pennId).length
                  }
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={styles.tableText}>
                  Total
                  Time Completed (Minutes)
                </DataTable.Cell>
                <DataTable.Cell>
                  {' '}
                  {(
                    appointmentList.current.filter((item) => item.pennid === pennId).length
                  ) * 60}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.title}>Scheduled Appointments</Text>
          <View style={styles.tablesection}>
            <DataTable style={styles.table}>
              <DataTable.Header>
                <DataTable.Title style={styles.tableText}>Date</DataTable.Title>
                <DataTable.Title>Time</DataTable.Title>
                <DataTable.Title>Therapist</DataTable.Title>
                <DataTable.Title>Action</DataTable.Title>
              </DataTable.Header>
              {dataIsLoaded && (
                appointmentList.current.filter((item) => item.pennid === pennId).map((item) => (
                  <DataTable.Row key={item.appointmentid}>
                    <DataTable.Cell style={styles.tableText}>{item.date}</DataTable.Cell>
                    <DataTable.Cell>{item.time}</DataTable.Cell>
                    <DataTable.Cell>{item.therapistname}</DataTable.Cell>
                    <DataTable.Cell>
                      <Button
                        mode="contained"
                        dark="true"
                        style={styles.cancelbutton}
                        onPress={() => {
                          cancelAppointment(item.appointmentid);
                        }}
                      >
                        Cancel
                      </Button>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))

              )}
            </DataTable>
          </View>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  body: {
    margin: 5,
  },

  title: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  table: {
    marginBottom: 20,
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

  cancelbutton: {
    width: '100%',
    fontSize: 10,
    marginRight: 5,
  },

  modalText: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 15,
    margin: 5,
    paddingBottom: 5,
  },
});
