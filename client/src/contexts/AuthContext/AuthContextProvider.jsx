import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { fetchData } from '../../helpers/axiosHelpers'

export const AuthContextProvider = ({children}) => {

  const [user, setUser] = useState()
  const [token, setToken] = useState()
  console.log('ssssssssssssssssssssssss',token);
  
  useEffect(()=>{
    //ver si hay token en LS, si no hay = null, si hay un Str. 
    const tokenLS = localStorage.getItem('token')
    if(tokenLS){
      //pedimos la info al Back
      const fetchUser = async()=>{
        try{
          const resUser = await fetchData('user/userByToken', 'GET', null, tokenLS)
          setUser(resUser.data.user);
          setToken(tokenLS)
        }catch(error){
          console.log(error)
        }
      }
      fetchUser();
    }
  },[]);

    const logOut = ()=>{
      setUser();
      setToken();
      localStorage.removeItem('token');
    }

  return (
    <div>
      <AuthContext.Provider value={{
                                user, 
                                setUser,
                                token,
                                setToken,
                                logOut
                                }}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}
