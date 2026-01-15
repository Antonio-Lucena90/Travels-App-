import React from 'react'
import {Button, Card} from 'react-bootstrap'
import './cardTravel.css'
import { useNavigate } from 'react-router'

export const CardTravel = ({travel}) => {
  const navigate = useNavigate();
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`${import.meta.env.VITE_SERVER_IMAGES}/travels/${travel.file}`} />
      <Card.Body>
        <Card.Title>{travel.title}</Card.Title>
        <Card.Text>
          Viajero: {travel.name} {travel.lastname}
        </Card.Text>
        <Card.Text>
          Ciudad: {travel.city}
        </Card.Text>
        <img 
          className='card-travel' 
          src={`${import.meta.env.VITE_SERVER_IMAGES}/users/${travel.avatar}`} 
          alt=""
          onClick={()=>navigate(`/oneUser/${travel.user_id}`)} />
        <Button variant="primary" onClick={()=>navigate(`/oneTravel/${travel.travel_id}`)}>Ver Viaje</Button>
      </Card.Body>
    </Card>
  )
}
