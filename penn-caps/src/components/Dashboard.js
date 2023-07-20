import React, { useState, useEffect, useRef } from 'react';
import {
  Button, Table, /* Modal */
} from 'react-bootstrap';
import '../css/Appointment.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import {
  checkUserSession, searchAppointments, scheduleAppointments, userLogout,
} from '../modules/api';

function dashboard() {
  const [pennId, setPennId] = useState('');
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const appointmentList = useRef([]);

  const navigate = useNavigate();

  function appointment() {
    navigate('/appointment');
  }
  function settings() {
    navigate('/settings');
  }
  function chat() {
    navigate('/chat');
  }
  async function logout() {
    await userLogout();
    navigate('/login');
  }

  useEffect(async () => {
    const result = await checkUserSession();
    setPennId(result);
  }, []);

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
    <div>
      <Header />
      <div className="body">
        <div className="apt-menu">
          <Button onClick={() => appointment()} className="menu-btn">Appointments</Button>
          <Button onClick={() => settings()} className="menu-btn">Settings</Button>
          <Button onClick={() => chat()} className="menu-btn">Chat</Button>
          <Button onClick={() => logout()} className="menu-btn">Logout</Button>
        </div>
        <div className="right">
          <h3 className="title">
            User Dashboard for
            {' '}
            {pennId}
          </h3>
          <div className="analytics-section">
            <h5 className="subtitle">Your Analytics</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th w-2="true">Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              {
                dataIsLoaded && (
                <tbody>
                  <tr>
                    <td>Total Sessions Scheduled</td>
                    <td colSpan={2}>
                      {
                        appointmentList.current.filter((item) => item.pennid === pennId).length
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Total Time Scheduled (Minutes)</td>
                    <td colSpan={2}>
                      {(
                        appointmentList.current.filter((item) => item.pennid === pennId).length
                      ) * 60}

                    </td>
                  </tr>
                </tbody>
                )
              }
            </Table>
          </div>
          <div className="appointment-section">
            <h5 className="subtitle">Scheduled Appointments</h5>
            <div className="appointment-table">
              <Table striped bordered hover className="appointment-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Therapist</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {dataIsLoaded && (
                <tbody>
                  {appointmentList.current.filter((item) => item.pennid === pennId).map((item) => (
                    <tr key={item.appointmentid}>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>{item.therapistname}</td>
                      <td>
                        <Button onClick={() => {
                          cancelAppointment(item.appointmentid);
                        }}
                        >
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                )}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default dashboard;
