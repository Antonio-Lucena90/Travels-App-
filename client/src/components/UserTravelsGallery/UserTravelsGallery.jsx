import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { Button } from 'react-bootstrap';
import { TravelsPicsGallery } from '../TravelsPicsGallery/TravelsPicsGallery';
import { fetchData } from '../../helpers/axiosHelpers';
import { EditTravelModal } from '../EditTravelModal/EditTravelModal';

const initialValue = {
  title:'',
  country:'',
  city:'',
  description:''
}

export const UserTravelsGallery = () => {
  const [show, setShow] = useState(false);
  const [travelToEdit, setTravelToEdit] = useState(initialValue)
  const { travels, token, setTravels } = useContext(AuthContext);

  const delTravel = async(travel_id)=>{
    try{
      //Borrar el viaje 
     let res= await fetchData(`travel/delTravel/${travel_id}`, 'DELETE', null, token)
     console.log(res);
      //actualizar el arrays de viajes
      setTravels(travels.filter(elem=>elem.travel_id !== travel_id))
    }catch(error){
      console.log(error);    
    }
  }
  const delLogicTravel = async(travel_id)=>{
    try{
      let res= await fetchData(`travel/delLogicTravel/${travel_id}`, 'PUT', null, token);
      console.log(res);
      setTravels(travels.filter(elem=>elem.travel_id !== travel_id))
      
    }catch(error){
      console.log(error);
    }
  }

  const handleClose = ()=>{setShow(false)}

  const openModal = (travel) =>{
    setShow(true);
    setTravelToEdit(travel);
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setTravelToEdit({...travelToEdit, [name]:value})
  }
  return (
    <div>
      <h1>Mis Viajes</h1>
      <hr />
      {travels?.map((elem) => {
        return (
          <div
            className="d-flex gap-4 border border-5 rounded p-5 m-4"
            key={elem.travel_id}
          >
            <div>
              <h3>{elem.title}</h3>
              <p>{elem.country}</p>
              <p>{elem.city}</p>
              <p>{elem.description}</p>
              <div className="d-flex flex-column gap-3">
                <Button onClick={()=>openModal(elem)}>Editar Viaje</Button>
                <Button onClick={()=>delTravel(elem.travel_id)}>Borrado total</Button>
                <Button onClick={()=>delLogicTravel(elem.travel_id)}>Borrado lógico</Button>
              </div>
            </div>
            <div>
              <TravelsPicsGallery travel_id={elem.travel_id}/>
            </div>
          </div>
        );
      })}
      <EditTravelModal 
            show={show} 
            handleClose={handleClose}
            travelToEdit={travelToEdit}
            handleChange={handleChange}
            token={token}
            travels={travels}
            setTravels={setTravels}/>
    </div>
  );
};
