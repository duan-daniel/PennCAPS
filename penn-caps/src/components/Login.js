import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../css/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import { getUser, usernameExists } from '../modules/api';

function Login() {
  const [pennId, setPennId] = useState('');
  const [password, setPassword] = useState('');
  const [pwdCount, setPwdCount] = useState(0);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  function handleUsername(e) {
    setPennId(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function login() {
    if (!pennId || !password) {
      setMessage('Fill in all required fields');
      setError(true);
    } else if (pwdCount < 2) {
      setError(false);
      const exists = await usernameExists(pennId);
      if (exists) {
        const user = await getUser(pennId, password);
        if (user.password === password) {
          navigate('/appointment');
        } else {
          setMessage('Incorrect Password');
          setError(true);
          setPwdCount(pwdCount + 1);
        }
      } else {
        setMessage('user does not exist!');
        setError(true);
      }
    } else {
      setMessage('Locked out of your account please wait 1 minute to try again');
      setError(true);
      setDisabled(true);
      setTimeout(() => { setDisabled(false); setPwdCount(0); setError(false); }, 60000);
    }
  }

  return (
    <div>
      <Header />
      <div className="login-box">
        <h3 className="center">Welcome!</h3>
        <Form className="form">
          <Form.Group>
            <Form.Label> Penn ID </Form.Label>
            <Form.Control type="text" onChange={(e) => handleUsername(e)} placeholder="Enter your Penn ID" />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label> Password </Form.Label>
            <Form.Control type="text" onChange={(e) => handlePassword(e)} placeholder="Enter your password" />
          </Form.Group>
          <br />
          {error ? <div className="errorTextStyle center">{message}</div> : null}
          <div>
            <div className="center">
              <Button onClick={() => login()} className="btn-login" disabled={disabled}>Log In</Button>
            </div>
            <br />
            <hr />
            <p className="center">
              Already have an account?
              {' '}
              <Link to="/signup">Sign Up!</Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
