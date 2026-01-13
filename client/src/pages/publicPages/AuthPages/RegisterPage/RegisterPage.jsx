import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { registerSchema } from '../../../../schemas/RegisterSchema';
import { ZodError } from 'zod';
import { fetchData } from '../../../../helpers/axiosHelpers.js';

const initialValue = {
  name: '',
  email: '',
  password: '',
};

const RegisterPage = () => {
  const [register, setRegister] = useState(initialValue);
  const [valErrors, setValErrors] = useState('');
  const [fetchError, setFetchError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    //valida campos
    try {
      registerSchema.parse(register);
      console.log('Validación ok');
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldsErrors = {};
        error.issues.forEach((elem) => {
          fieldsErrors[elem.path[0]] = elem.message;
        });
        setValErrors(fieldsErrors);
      } else {
        setValErrors({})
        if(error.response.data.errno === 1062){
            setFetchError('email repetido')
        }else{
          setFetchError('Ups, hay un error chungo');
        }
      
      }
    }
    //mandar datos al back
      const res = await fetchData('user/register', 'POST', register)
      console.log(res);
      
      navigate('/login')

  };
  return (
    <div className="d-flex justify-content-center p-5">
      <Form className="w-25 mt-5 border border-2 rounded-3 p-5 ">
        <h2>Formulario de Registro</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={handleChange}
            name="name"
            value={register.name}
          />
            {valErrors?.name && (
          <p className="error-msg">{valErrors.name}</p>
        )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            name="email"
            value={register.email}
          />
          {valErrors?.email && (
          <p className=" error-msg">{valErrors.email}</p> )}
          {fetchError?.email && (<p className='error-msg'>{fetchError.email}</p>)}
       
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={register.password}
          />
              {valErrors?.password && (
          <p className=" error-msg">{valErrors.password}</p>
        )}
        </Form.Group>
        <div className="mb-3">
          <Button variant="primary" onClick={onSubmit}>
            Submit
          </Button>
          <Button
            className="ms-3"
            variant="primary"
            onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
        <p className='error-msg'>{fetchError}</p>
        <Form.Text>
          ¿Estás ya registrado?<Link to="/login">Login aquí</Link>
        </Form.Text>
      </Form>
    </div>
  );
};

export default RegisterPage;
