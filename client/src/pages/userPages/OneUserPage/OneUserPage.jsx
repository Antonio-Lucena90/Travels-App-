import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchData } from '../../../helpers/axiosHelpers';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

const OneUserPage = () => {
  const [user, setUSer] = useState()
  const {user_id} = useParams();
  const {token} = useContext(AuthContext)

  useEffect(()=>{
    const fetchUser = async()=>{
     const res = await fetchData(`user/userById/${user_id}`, 'GET', null, token)
     setUSer(res.data.result)
    }
    fetchUser()
  }, [])

  useEffect(()=>{}, [])

  return (
    <>
    <div>
      <h1>Viajero: {user?.name}</h1>
      <img src={`${import.meta.env.VITE_SERVER_IMAGES}/users/${user?.avatar}`} alt="" />
      <hr />
      <h2>Comentarios</h2>
      ARRAY CON COMENTARIOS ENN CADA ELMENTEO FOTO DEL USER, 
      <div>
        comentarios
      </div>
      <div>
        comentarios
      </div>
      <p>Pon un comentario</p>
      <input type="text" />
      <Button>Enviar Comentario</Button>
    </div>
    </>
  )
}

export default OneUserPage