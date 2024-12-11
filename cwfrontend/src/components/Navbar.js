import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Loging from './Loging';

export default function CustomNavbar() {

const navigate = useNavigate();

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
            <Nav.Link href="#home" style={{ color: '#000' }} onClick={()=>navigate("/")}>Home</Nav.Link>
            <Nav.Link href="#" className="ms-2" style={{ color: '#000' }} onClick={()=>navigate("/simulationPage")}>Configuration</Nav.Link>
            <Nav.Link href="#pricing" style={{ color: '#000' }}></Nav.Link>
            <Button variant="outline-success" onClick={()=>navigate('./loging')}>Add Ticket</Button>
            <Button variant="outline-success" className="ms-2" onClick={()=>navigate('/venderlogin')}>Buy Ticket</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
