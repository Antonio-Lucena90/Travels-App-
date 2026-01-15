import React, { useContext, useEffect, useState } from 'react'
import {fetchData} from '../../../helpers/axiosHelpers.js'
import {AuthContext} from '../../../contexts/AuthContext/AuthContext.js'
import { CardTravel } from '../../../components/CardTravel/CardTravel.jsx';

const AllUsersPage = () => {
  const {token} = useContext(AuthContext);
  const [allTravels, setAllTravels] = useState()
  useEffect(()=>{
    const fetchAllTravels = async()=>{
      try{
        let res = await fetchData('user/allUserTravels', 'GET', null,token)
        console.log(res);
        setAllTravels(res.data.result)
      }catch(error){
        console.log(error);
        
      }
    }
    fetchAllTravels()
  }, [])
  return (
    <>
    <h1>Todos los viajes de Todo el Mundo</h1>
    <hr />
    <div className='d-flex flex-wrap gap-3'>
      {allTravels?.map((elem)=>{
        return(
          <CardTravel travel={elem} key={elem.travel_id}/>
        )
      })}
    </div>
    </>
  )
}

export default AllUsersPage