import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function CustomNavbar() {
  const brandStyle = {
    fontFamily: "'Pacifico', cursive", 
    fontSize: '1.5rem',
    color: '#008000', 
  };

  return (
    <>
      <Navbar style={{ backgroundColor: '#fff', borderBottom: '1px solid #000' }} expand="lg">
        <Container>
          <Navbar.Brand href="#home" style={brandStyle}>
            Event Booking System
          </Navbar.Brand>
          <Nav className="ms-auto"> 
            <Nav.Link href="#home" style={{ color: '#000' }}>Home</Nav.Link>
            <Nav.Link href="#home" style={{ color: '#000' }}>About Us</Nav.Link>
            <Nav.Link href="#features" style={{ color: '#000' }}></Nav.Link>
            <Nav.Link href="#pricing" style={{ color: '#000' }}></Nav.Link>
            <Button variant="outline-success">Add Ticket</Button>
            <Button variant="outline-success" className="ms-2">Buy Ticket</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
