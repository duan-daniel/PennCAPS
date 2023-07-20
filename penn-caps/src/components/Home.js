import React from 'react';
import {
  Button,
  Image,
  Container,
  Navbar,
  Nav,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import logo from '../css/logo.png';

function Home() {
  const navigate = useNavigate();

  function login() {
    navigate('/login');
  }

  return (
    <div>
      <Navbar sticky="top">
        <Container className="nav-container">
          <Navbar.Brand href="#home" className="caps-logo"><Image src={logo} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-links">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">About Us</Nav.Link>
              <Nav.Link href="#link">Resources</Nav.Link>
              <Nav.Link href="#link">FAQ</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="home-copy">
        <div className="heading-label mb-2">
          <p>UNIVERSITY OF PENNSYLVANIA</p>
        </div>
        <div className="home-title mb-3">
          <h1>Welcome to Student Counseling</h1>
        </div>
        <div className="home-description mb-3">
          <p>
            We are committed to creating an affirming environment based on our values of
            multicultural, multi-disciplinary and inclusive practices, focused on providing care
            to our diverse student body.
          </p>
        </div>
        <div className="btn-start">
          <Button onClick={() => login()}>Get Started</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
