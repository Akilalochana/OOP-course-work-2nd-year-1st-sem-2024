import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css';
import { useNavigate } from 'react-router-dom';


export default function Loging(props) {
  const navigate = useNavigate();

  return (
    <>
    <div className='loginsignbtn'>
    <Button variant="primary" type="submit" onClick={()=>navigate("/loging")} >
      LOGIN
    </Button>
    <Button variant="primary" type="submit" className="ms-5" onClick={()=>navigate("/register")}>
      REGISTER
    </Button>
    </div>

    <Form>
      <h1>{props.CorV}</h1>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
    </>


  )
}
