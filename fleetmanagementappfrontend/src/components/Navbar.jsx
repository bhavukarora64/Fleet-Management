import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ padding: '0.3rem 0.5rem' }}>
      <Navbar.Brand href="/" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center' }}>
        <img 
          src="https://cdn-icons-png.flaticon.com/128/17009/17009347.png" 
          alt="Fleet4U Logo" 
          width="50" 
          height="50" 
          className="d-inline-block align-top rounded-circle" 
          style={{ marginRight: '0.5rem' }}
        />
        FLEET4U
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" style={{ fontSize: '1rem' }}>Home</Nav.Link>
          <Nav.Link href="https://fleet-management-eta.vercel.app/dashboard" style={{ fontSize: '1rem' }}>Dashboard</Nav.Link>
          <NavDropdown title="More" id="basic-nav-dropdown" style={{ fontSize: '1rem' }}>
            <NavDropdown.Item href="/maps">Maps</NavDropdown.Item>
            <NavDropdown.Item href="/login">Sign In</NavDropdown.Item>
            <NavDropdown.Item href="/register">Sign Up</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="d-flex ms-auto">
          <FormControl 
            type="search" 
            placeholder="Search" 
            className="me-2" 
            style={{ fontSize: '0.9rem', padding: '0.2rem' }}
          />
          <Button variant="outline-light" style={{ fontSize: '0.9rem', padding: '0.3rem 0.6rem' }}>Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
