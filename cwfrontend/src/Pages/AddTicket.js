import React from 'react'
import Form from 'react-bootstrap/Form';
import './addTicket.css';


export default function AddTicket() {
  return (
    <>
<div><h1>Add Ticket</h1></div>

        <div className='addaddticketcss'>
    <Form.Control size="lg" type="text" placeholder="Large text" />
    <br />
    <Form.Control size="lg" type="text" placeholder="Large text" />
    <br />
    <Form.Control size="lg" type="text" placeholder="Large text" />
    <br />
    <Form.Control size="lg" type="text" placeholder="Large text" />
  </div></>

  )
}
