import React, { useState } from 'react';
import {
  Button,
  Form,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import '../css/Login.css';
import { addUser, usernameExists } from '../modules/api';

function Signup() {
  const [pennId, setPennId] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  function handleUsername(e) {
    setPennId(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
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

  async function signup() {
    if (!firstname || !lastname || !pennId || !password) {
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
        await addUser(pennId, password, firstname, lastname);
        const handleShow = () => setShow(true);
        handleShow();
        setTimeout(() => { navigate('/appointment'); }, 5000);
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="login-box">
        <h3 className="center">Create Account</h3>
        <Form className="form">
          <Row>
            <Col>
              <Form.Group>
                <Form.Label> First Name </Form.Label>
                <Form.Control type="text" onChange={(e) => handleFirstName(e)} placeholder="E.g. Ben" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label> Last Name </Form.Label>
                <Form.Control type="text" onChange={(e) => handleLastName(e)} placeholder="E.g. Franklin" />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Group>
                <Form.Label> Penn ID </Form.Label>
                <Form.Control type="text" onChange={(e) => handleUsername(e)} placeholder="bfranklin" />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Group>
                <Form.Label> Password </Form.Label>
                <Form.Control type="text" onChange={(e) => handlePassword(e)} placeholder="Please enter alphanumeric characters only" />
              </Form.Group>
            </Col>
          </Row>
          <br />
          {error ? <div className="errorTextStyle center">{message}</div> : null}
          <div>
            <div className="center">
              <Button onClick={() => signup()} className="btn-login">Get Started</Button>
              <Modal show={show}>
                <Modal.Body>Successfully signed up!</Modal.Body>
              </Modal>
            </div>
            <br />
            <hr />
            <p className="center">
              Already have an account?
              {' '}
              <Link to="/login">Log In!</Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Signup;
