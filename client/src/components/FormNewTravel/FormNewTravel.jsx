import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { fetchData } from '../../helpers/axiosHelpers';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const initialValues = {
  title: '',
  country: '',
  city: '',
  description: '',
};

export const FormNewTravel = ({setShowFormNewTravel}) => {
  const [newTravel, setNewTravel] = useState(initialValues);
  const [pictures, setPictures] = useState();

  const {token} = useContext(AuthContext)

  const handleChange = (e) => {
    const {name, value} = e.target;
    if(name === 'pictures'){
      setPictures(e.target.files)
    }else{
      setNewTravel({...newTravel, [name]:value})
    }
  };

  const onSubmit = async()=>{
    
       try{
        //validar
        //preparar datos
        const newFormData = new FormData()
        newFormData.append('newTravel', JSON.stringify(newTravel));
        if(pictures){
          for(const elem of pictures){
          newFormData.append('img', elem)
          }
        }
        const res = await fetchData('travel/newTravel', 'POST', newFormData, token);
        console.log(res);
        
      }catch(error){
        console.log(error)
      }
  }

  return (
    <div>
      <Form>
        <h2>Formulario nuevo viaje</h2>
        <Form.Group className="mb-3">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Titulo"
            name="title"
            value={newTravel.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Pais</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter lastname"
            name="country"
            value={newTravel.country}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            name="city"
             placeholder="Enter Ciudad"
            value={newTravel.city}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            name="description"
             placeholder="Enter Descripción"
            value={newTravel.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor='images'>Introduce tus Imagenes</Form.Label>
          <Form.Control
            type="file"
            multiple
            id='images'
            name="pictures"
            hidden
            onChange={handleChange}
          />
        </Form.Group>

        <div className='d-flex gap-3'>
          <Button variant="primary" onClick={onSubmit}>Submit</Button>
          <Button variant="primary" onClick={()=>setShowFormNewTravel(false)}>Cancelar</Button>
        </div>
      </Form>
    </div>
  );
};
