import React, { useState, useEffect, useRef } from 'react';
import {
  Button, Table, Modal,
} from 'react-bootstrap';
import '../css/Appointment.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import {
  checkUserSession, searchAppointments, scheduleAppointments, userLogout,
} from '../modules/api';

function Appointment() {
  const [pennId, setPennId] = useState('');
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(-1);
  const navigate = useNavigate();
  const appointmentList = useRef([]);
  const [selectedPennId, setSelectedPennId] = useState('');

  async function makeAppointment(pennid, appointmentid) {
    await scheduleAppointments(pennid, appointmentid);
  }

  async function dashboard() {
    await makeAppointment(selectedPennId, selectedAppointment);
    navigate('/dashboard');
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

  return (
    <div>
      <Header />
      <div className="body">
        <div className="apt-menu">
          <Button onClick={() => dashboard()} className="menu-btn">Dashboard</Button>
          <Button onClick={() => settings()} className="menu-btn">Settings</Button>
          <Button onClick={() => chat()} className="menu-btn">Chat</Button>
          <Button onClick={() => logout()} className="menu-btn">Logout</Button>
        </div>
        <div className="right">
          <h3 className="title">
            Welcome back,
            {' '}
            {pennId}
            !
          </h3>
          <h5>Available Appointments</h5>
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
                {appointmentList.current.map((item) => (
                  <tr key={item.appointmentid}>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.therapistname}</td>
                    <td>
                      <Button
                        disabled={item.pennid !== '0'}
                        onClick={() => {
                          setShow(true);
                          setSelectedAppointment(item.appointmentid);
                          setSelectedPennId(pennId);
                        }}
                      >
                        Book
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
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          setSelectedAppointment(-1);
        }}
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Appointment</Modal.Title>
        </Modal.Header>
        {
          show && (
          <Modal.Body>
            Please confirm your appointment at
            {' '}
            {appointmentList.current[selectedAppointment].date}
            {' '}
            with
            {' '}
            {appointmentList.current[selectedAppointment].therapistname}
            .
          </Modal.Body>
          )
        }
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
              setSelectedAppointment(-1);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={() => dashboard()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Appointment;
