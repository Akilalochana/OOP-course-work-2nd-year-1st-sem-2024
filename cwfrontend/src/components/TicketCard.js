import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import ticket from '../images/ticket.jpg';

import { useNavigate } from 'react-router-dom';

export default function TicketCard() {
  const navigate = useNavigate();
  return (
    <Card style={{ width: '100px', height: '180px' }}> {/* Adjusted width and height */}
      <Card.Img 
        variant="top" 
        src={ticket} 
        style={{ height: '70px', objectFit: 'cover' }} 
      />
      <Card.Body style={{ padding: '3px' }}>
      <Card.Text style={{ fontSize: '12px',  marginBottom: '0px' }}>Ticket Id:</Card.Text>
      <Card.Text style={{ fontSize: '12px',  marginBottom: '0px' }}>eventName:</Card.Text>
        <Card.Text style={{ fontSize: '12px',  marginBottom: '0px' }}>Ticket Price:</Card.Text>
        <Card.Text style={{ fontSize: '12px',  marginBottom: '0px' }}>customerId:</Card.Text>
        <Button variant="outline-success" size='sm' onClick={()=>navigate('./loging')}>Add Ticket</Button>
      </Card.Body>
    </Card>
  );
}



