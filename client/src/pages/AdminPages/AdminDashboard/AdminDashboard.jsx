import React from 'react'
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router'

const AdminDashboard = () => {

  const navigate = useNavigate()

  return (
    <div>
      <h1>Administrador Molón molonero</h1>
      <hr />
      <Button onClick={()=>navigate('/adminUser')}>
        Administrar Usuario
      </Button>
    </div>
  )
}

export default AdminDashboard