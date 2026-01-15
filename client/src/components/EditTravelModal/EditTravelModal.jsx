import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import {fetchData} from '../../helpers/axiosHelpers.js'

export const EditTravelModal = ({show, handleClose, travelToEdit, handleChange, token, travels, setTravels}) => {
  
  const onSubmit = async ()=>{
    try{
      const res = await fetchData(`travel/editTravel`, 'PUT', travelToEdit, token)
      setTravels(travels.map(elem =>{
        if(elem.travel_id === travelToEdit.travel_id){
          return travelToEdit
        }else{
          return elem
        }
      }))
      handleClose();
    }catch(error){
      console.log(error);
      
    }
    
    
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Titulo</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter title"
                value={travelToEdit.title}
                name='title'
                onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCountry">
            <Form.Label>País</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter country"
              value={travelToEdit.country} 
              name='country'
               onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter city"
              value={travelToEdit.city}
              name='city'
               onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter description"
              value={travelToEdit.description}
              name='description'
               onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button 
          variant="primary"
          onClick={onSubmit}>Aceptar</Button>
      </Modal.Footer>
    </Modal>
  );
};
