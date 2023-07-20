import React from 'react';
import {
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import logo from '../css/logo.png';
import '../css/Header.css';

function Header() {
  return (
    <Container className="header-container">
      <Row>
        <Col className="logo">
          <Image src={logo} />
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
