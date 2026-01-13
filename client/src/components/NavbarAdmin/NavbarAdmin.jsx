import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'

export const NavbarAdmin = () => {
  const {logOut} = useContext(AuthContext)

  return (
   <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to='/'>Navbar Admin</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
          </Nav>
          <div>
            <Button onClick={logOut}>LogOut</Button>
          </div>
        </Container>
      </Navbar>
  )
}
