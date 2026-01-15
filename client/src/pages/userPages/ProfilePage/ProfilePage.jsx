import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import { FormNewTravel } from '../../../components/FormNewTravel/FormNewTravel';
import './profilePage.css'
import { UserTravelsGallery } from '../../../components/UserTravelsGallery/UserTravelsGallery';

const ProfilePage = () => {
  const [showFormNewTravel, setShowFormNewTravel] = useState(false)
  const {user} = useContext(AuthContext)

  const navigate = useNavigate()
  return (
    <>
     <section>
      <Container>
        <Row>
          <Col>
            <div className="d-flex flex-column gap-2">
              <h2>Tu Perfil</h2>
              <hr />
              <p>Nombre: {user?.name}</p>
              <p>Apellido: {user?.lastname}</p>
              <p>Email: {user?.email}</p>
              <p>Teléfono: {user?.phone}</p>
              <p>Fecha de Nacimiento: {user?.birth_date?.split('-').reverse().join('-')}</p>
            </div>
          </Col>
          <Col>
            <img className='image-profil' src={`${import.meta.env.VITE_SERVER_IMAGES}/users/${user?.avatar}`} alt="" />
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <div className="d-flex flex-column gap-3">
              <Button onClick={()=>navigate('/editUser')}>Editar</Button>
              <Button>Eliminar</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <section>
      <Container>
        <Row className='mt-5 d-flex justify-content-center mb-5'>
          <Col xl={4}>
            {!showFormNewTravel ? 
              <Button
              onClick={()=>setShowFormNewTravel(true)}>Añadir Viaje</Button>:<FormNewTravel setShowFormNewTravel={setShowFormNewTravel}/>
              }
          </Col>
        </Row>
        <Row>
          
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <UserTravelsGallery/>
          </Col>
        </Row>
      </Container>
    </section>
    </>
   
  );
};

export default ProfilePage;
