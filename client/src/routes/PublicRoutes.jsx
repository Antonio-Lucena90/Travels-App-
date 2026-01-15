import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { AuthContext } from '../contexts/AuthContext/AuthContext'

/* es el encargado de autorizar la entrada a las rutas publicas, solo tiene logica */

export const PublicRoutes = () => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(user){
      if(user.type === 1)navigate('/allUsers');
      if(user.type === 2)navigate('/admin')
    }
  },[user])

  return (
    <div>
      <Outlet/>
    </div>
  )
}
