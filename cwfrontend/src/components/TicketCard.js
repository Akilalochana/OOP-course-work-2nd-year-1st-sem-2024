import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import ticket from '../images/ticket.jpg';

export default function TicketCard() {
  return (
    <Card style={{ width: '100px', height: '180px' }}> {/* Adjusted width and height */}
      <Card.Img 
        variant="top" 
        src={ticket} 
        style={{ height: '70px', objectFit: 'cover' }} // Adjust image height and fit
      />
      <Card.Body style={{ padding: '5px' }}>
      <Card.Text style={{ fontSize: '12px' }}>Ticket No:</Card.Text>
        <Card.Text style={{ fontSize: '12px' }}>Ticket Price:</Card.Text>
        <Button variant="primary" size="sm">Buy</Button> {/* Smaller button */}
      </Card.Body>
    </Card>
  );
}

