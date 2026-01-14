import React, { useContext } from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import { fetchData } from '../../../../helpers/axiosHelpers'
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext'

const initialValue = {
  email: '',
  password: ''
}

const LoginPage = () => {
  const [login, setLogin] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState('')

  const {setUser, setToken, setTravels} = useContext(AuthContext);

  const navigate = useNavigate(); 

  const handleChange = (e)=>{
     const {name, value} = e.target
     setLogin({...login, [name]:value})
  }

  const onSubmit = async()=>{
    try{
      //valida campos
      let res = await fetchData('user/login', 'POST', login);
      const token = res.data.token;
      //guardamos token en el localStorage (SOLO permite STRINGS)
      //peticion para traer los datos del user, segura con token
      const resUser = await fetchData('user/userByToken', 'GET', null, token)
      console.log(resUser);
      
      setUser(resUser.data.user);
      setTravels(resUser.data.travels)
      localStorage.setItem('token', token)
      setToken(token);

    }catch(error){
      console.log(error)
      setErrorMsg(error.response.data.message)
    }
  }
  return (
    <div className='d-flex justify-content-center p-5'>
      <Form className='w-25 mt-5 border border-2 rounded-3 p-5 '>
        <h2>Formulario de Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
              type="email" 
              placeholder="Enter email"
              name='email'
              value={login.email}
              onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
              type="password" 
              placeholder="Password" 
              name='password'
              value={login.password}
              onChange={handleChange}/>
        </Form.Group>
        <p className='error-msg'>{errorMsg}</p>
        <div className='mb-3'>
          <Button 
              variant="primary"
              onClick={onSubmit}>
            Submit
          </Button>
          <Button 
            className='ms-3' 
            variant="primary" 
            onClick={()=>navigate(-1)}
            >
            Cancel
          </Button>
        </div>
        <Form.Text className='mt-3'>¿Aún no estás registrado?<Link to='/register'>Register aquí</Link></Form.Text>
      </Form>
    </div>
  )
}

export default LoginPage