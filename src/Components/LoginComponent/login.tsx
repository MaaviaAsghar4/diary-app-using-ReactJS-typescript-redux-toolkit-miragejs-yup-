import React, {useState} from "react";
import {Form, Button} from 'react-bootstrap'
import Home from '../HomeComponent/Home'

const Login = () => {
  let [routeChange, setRouteChange] = useState<number>(0)

  let changeRoute = (e:any) => {
    e.preventDefault()
    setRouteChange(1)
  }

  if (routeChange !== 0) {
    return <Home />
  }
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '80vw', margin: '0 auto'}}>
      <Form onSubmit={changeRoute}>
        <Form.Group controlId="formBasicText">
          <Form.Label>Username</Form.Label>
          <Form.Control required type="text" placeholder="Enter Username" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Enter Password" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>(Optional) Enter Email</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default Login;
