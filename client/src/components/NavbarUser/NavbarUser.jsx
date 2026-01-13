import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import './navbarUser.css'

export const NavbarUser = () => {
  const {logOut, user} = useContext(AuthContext);

  const navigate = useNavigate()
  
  return (
   <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to='/profile'>Navbar User</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/allUsers'>Red Social</Nav.Link>
          </Nav>
          <div className='d-flex gap-2'>
            <div className='d-flex gap-2 align-items-center'>
              <p className='m-0'>{user?.name} {user.lastname && user.lastname}</p>
              {user?.avatar ? <img className='avatar-img'src={`http://localhost:4000/images/users/${user.avatar}`} onClick={()=>navigate('/profile')}/>:
              <div 
              onClick={()=>navigate('/profile')}
              className='nav-avatar-letra'>{user?.name[0].toUpperCase()}</div>}
            <Button onClick={logOut}>LogOut</Button>
          </div>
          </div>
        </Container>
      </Navbar>
  )
}
