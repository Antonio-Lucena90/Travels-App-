import React from 'react'
import {Button, Container, Nav, Navbar} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'

export const NavbarPublic = () => {
  const navigate = useNavigate()
  return (
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to='/'>Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
          </Nav>
          <div>
            <Button onClick={()=>navigate('/register')}>Register</Button>
            <Button onClick={()=>navigate('/login')}>Login</Button>
          </div>
        </Container>
      </Navbar>
  )
}
