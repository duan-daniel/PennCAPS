import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { checkUserSession, updateUser } from '../modules/api';
import '../css/Login.css';

function Settings() {
  const [pennId, setPennId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const areAllFieldsFilled = (password !== '');

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function updateSettings() {
    await updateUser(pennId, password);
    navigate('/appointment');
  }

  useEffect(async () => {
    const result = await checkUserSession();
    setPennId(result);
  }, []);

  return (
    <div>
      <Header />
      <div className="login-box">
        <h3 className="center">
          Update Settings for
          {' '}
          {pennId}
          {' '}
        </h3>
        <Form className="form">
          <Row>
            <Col>
              <Form.Group>
                <Form.Label> Password </Form.Label>
                <Form.Control type="text" onChange={(e) => handlePassword(e)} placeholder="New Password" />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <div>
            <div className="center">
              <Button disabled={!areAllFieldsFilled} onClick={() => updateSettings()} className="btn-login">Update</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Settings;
