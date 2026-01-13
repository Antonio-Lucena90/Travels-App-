import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { fetchData } from '../../../helpers/axiosHelpers';
import { useNavigate } from 'react-router';


const EditUserPage = () => {
  const {user, token, setUser} = useContext(AuthContext)

  const [editUser, setEditUser] = useState(user);
  const [avatar, setAvatar] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'avatar'){
      setAvatar(e.target.files[0])
    }else{
      setEditUser({ ...editUser, [name]: value });
    }
  }

  const onSubmit = async()=>{
      try{
      //validar Datos! 

      //preparar datos para mandarlos al back
      //como hay file => formData
      const newFormData = new FormData(); 
      newFormData.append('editUser', JSON.stringify(editUser));
      newFormData.append('img', avatar);

      //mandar al back los datos
      const res = await fetchData('user/editUser', 'PUT', newFormData, token)

      if(res.data.newAvatar){
             setUser({...user, 
                name: editUser.name,
                lastname: editUser.lastname,
                phone: editUser.phone,
                birth_date: editUser.birth_date,
                avatar: res.data.newAvatar,
              })
      }else{
          setUser({...user, 
                name: editUser.name,
                lastname: editUser.lastname,
                phone: editUser.phone,
                birth_date: editUser.birth_date})
      }
      navigate('/profile')
      
      }catch(error){
        console.log(error)
      }

  }
  return (
    <section>
      <Container>
        <Row className="d-flex justify-content-center pt-5">
          <Col xs={4}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={editUser.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter lastName"
                  name="lastname"
                  value={editUser.lastname?editUser.lastname:''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBirthDate">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="birth_date"
                  value={editUser.birth_date?editUser.birth_date:''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Teléfono"
                  name="phone"
                  value={editUser.phone?editUser.phone:''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label htmlFor="foto">Imagen</Form.Label>
                <Form.Control 
                  type="file" 
                  id="foto" 
                  name='avatar'
                  hidden 
                  onChange={handleChange}/>
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="primary" onClick={onSubmit}>Aceptar</Button>
                <Button variant="primary" onClick={()=>navigate('/profile')}>Cancelar</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditUserPage;
