import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import './addTickets.css';
import CustomNavbar from './Navbar';

export default function SimulationPage() {
  const [config, setConfig] = useState({
    totalTickets: '',
    numberOfVendors: '',
    numberOfCustomers: '',
    ticketReleaseRate: '',
    customerRetrievalRate: '',
    maxTicketCapacity: ''
  });
  const [simulationStatus, setSimulationStatus] = useState('stopped');
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setConfig({ ...config, [e.target.name]: parseInt(e.target.value) || '' });
  };

  const startSimulation = async () => {
    try {
      // Validate inputs
      if (Object.values(config).some(value => value === '')) {
        setError('All fields must be filled out');
        return;
      }
      
      await axios.post('http://localhost:8081/api/simulation/start', config);
      setSimulationStatus('running');
      setError(null);
      fetchData();
    } catch (error) {
      setError(error.response?.data || 'Error starting simulation');
    }
  };

  const stopSimulation = async () => {
    try {
      await axios.post('http://localhost:8081/api/simulation/stop');
      setSimulationStatus('stopped');
      fetchFinalResults();
    } catch (error) {
      setError(error.response?.data || 'Error stopping simulation');
    }
  };

  const fetchData = async () => {
    if (simulationStatus === 'running') {
      try {
        const response = await axios.get('http://localhost:8081/api/simulation/tickets');
        setTickets(response.data);
        setTimeout(fetchData, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const fetchFinalResults = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/simulation/tickets');
      setTickets(response.data);
    } catch (error) {
      setError('Error fetching final results');
    }
  };

  useEffect(() => {
    if (simulationStatus === 'running') {
      fetchData();
    }
    return () => clearTimeout(fetchData);
  }, [simulationStatus]);

  const TicketCard = ({ ticket }) => (
    <Card 
      className={`mb-2 ${ticket.sold ? 'border-success' : 'border-warning'}`}
      style={{ backgroundColor: ticket.sold ? '#e8f5e9' : '#fff3e0' }}
    >
      <Card.Body>
        <Card.Title>Ticket #{ticket.ticketId}</Card.Title>
        <Card.Text>
          Event: {ticket.eventName}<br/>
          Price: ${ticket.ticketPrice}<br/>
          Status: {ticket.sold ? `Sold to Customer ${ticket.customerId}` : 'Available'}<br/>
        </Card.Text>
      </Card.Body>
    </Card>
  );

  const SimulationSummary = () => {
    const soldTickets = tickets.filter(t => t.sold);
    const availableTickets = tickets.filter(t => !t.sold);
    
    return (
      <div className="simulation-summary">
        <h3>Simulation Summary</h3>
        <div className="statistics mb-3">
          <p>Total Tickets: {tickets.length}</p>
          <p>Sold Tickets: {soldTickets.length}</p>
          <p>Available Tickets: {availableTickets.length}</p>
        </div>

        <div className="row">
          <div className="col-md-4">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Total Tickets</Card.Title>
                <h2>{tickets.length}</h2>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Sold Tickets</Card.Title>
                <h2>{soldTickets.length}</h2>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Available Tickets</Card.Title>
                <h2>{availableTickets.length}</h2>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <><CustomNavbar />
    <div className="container mt-4">
      <h1 className="mb-4">Ticket Sales Simulation</h1>
      
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      
      <div className="row">
        <div className="col-md-4">
          <Card className="mb-4">
            <Card.Header>Simulation Configuration</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Total Tickets:</Form.Label>
                  <Form.Control
                    type="number"
                    size="sm"
                    name="totalTickets"
                    value={config.totalTickets}
                    onChange={handleInputChange}
                    disabled={simulationStatus === 'running'}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Number of Vendors:</Form.Label>
                  <Form.Control
                    type="number"
                    size="sm"
                    name="numberOfVendors"
                    value={config.numberOfVendors}
                    onChange={handleInputChange}
                    disabled={simulationStatus === 'running'}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Number of Customers:</Form.Label>
                  <Form.Control
                    type="number"
                    size="sm"
                    name="numberOfCustomers"
                    value={config.numberOfCustomers}
                    onChange={handleInputChange}
                    disabled={simulationStatus === 'running'}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ticket Release Rate (seconds):</Form.Label>
                  <Form.Control
                    type="number"
                    size="sm"
                    name="ticketReleaseRate"
                    value={config.ticketReleaseRate}
                    onChange={handleInputChange}
                    disabled={simulationStatus === 'running'}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Customer Retrieval Rate (seconds):</Form.Label>
                  <Form.Control
                    type="number"
                    size="sm"
                    name="customerRetrievalRate"
                    value={config.customerRetrievalRate}
                    onChange={handleInputChange}
                    disabled={simulationStatus === 'running'}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Max Ticket Capacity:</Form.Label>
                  <Form.Control
                    type="number"
                    size="sm"
                    name="maxTicketCapacity"
                    value={config.maxTicketCapacity}
                    onChange={handleInputChange}
                    disabled={simulationStatus === 'running'}
                  />
                </Form.Group>
              </Form>
              <div className="d-grid gap-2">
                <Button
                  variant={simulationStatus === 'running' ? 'secondary' : 'primary'}
                  onClick={startSimulation}
                  disabled={simulationStatus === 'running'}
                >
                  Start Simulation
                </Button>
                <Button
                  variant="danger"
                  onClick={stopSimulation}
                  disabled={simulationStatus === 'stopped'}
                >
                  Stop Simulation
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
        
        <div className="col-md-8">
          <div className="tickets-grid">
            <h3>Tickets Status</h3>
            <div className="row">
              {tickets.map(ticket => (
                <div key={ticket.ticketId} className="col-md-4 mb-3">
                  <TicketCard ticket={ticket} />
                </div>
              ))}
            </div>
          </div>
          
          {simulationStatus === 'stopped' && tickets.length > 0 && (
            <SimulationSummary />
          )}
        </div>
      </div>
    </div>
    </>
  );
}