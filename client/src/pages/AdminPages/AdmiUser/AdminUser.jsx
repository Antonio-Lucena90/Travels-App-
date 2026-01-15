import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '../../../helpers/axiosHelpers'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import { Button, Table } from 'react-bootstrap'

const AdminUser = () => {
  const [users, setUsers] = useState()
  const {token} = useContext(AuthContext)

  useEffect(()=>{
    const fetchUser = async()=>{
      try{
        const res = await fetchData('admin/allUsers', 'GET', null, token);
        setUsers(res.data.result)
        console.log(res);
      }catch(error){
        console.log(error);
        
      }
    }
    fetchUser()
  }, []) 
  
  const banHandler = async(id, isDeleted)=>{
    let url = `admin/disableUser/${id}`
      if(isDeleted) url= `admin/enableUser/${id}`
       try{
        const res = await fetchData(url, 'PUT', null, token);
        console.log(res);
        setUsers(users.map(e=>{
          if(e.user_id === id){
            return {...e, user_is_deleted: !e.user_is_deleted}
          }else{
            return e
          }
        }))
      }catch(error){
        console.log(error);
        
      }
  }
 
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>email</th>
          <th>Baneado</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((elem)=>{
          return(
          <tr>
          <td>{elem.user}</td>
          <td>{elem.name}</td>
          <td>{elem.lastname}</td>
          <td>{elem.email}</td>
          <td>{elem.user_is_deleted?'SI':'NO'}</td>
          <td><Button onClick={()=>banHandler(elem.user_id, elem.user_is_deleted)}>{elem.user_is_deleted?'Desbloquear':'Bloquear'}</Button></td>
          
        </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default AdminUser