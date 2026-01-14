import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { fetchData } from '../../helpers/axiosHelpers';
import './travelsPicsGallery.css';
import delete_icon from '../../assets/icons/delete.svg';
import { Button } from 'react-bootstrap';

export const TravelsPicsGallery = ({ travel_id }) => {
  const [images, setImages] = useState([]);
  const [newPics, setNewPics] = useState();
  const [msgError, setMsgError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    const fetchPics = async () => {
      try {
        const res = await fetchData(
          `travel/getImages/${travel_id}`,
          'GET',
          null,
          token
        );
        setImages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPics();
  }, []);
  console.log(images);

  const handleChange = (e) => {
    setNewPics(e.target.files)
  };

  const addPicture = async () => {

    try{
      if(newPics){
          const newFormData = new FormData();
          for(const elem of newPics){
            newFormData.append('img', elem)
          }
          newFormData.append('travel_id', travel_id)
          const res = await fetchData(`travel/addPictures/${travel_id}`, 'POST', newFormData, token);
          console.log(res);
          
        }else{
          setMsgError('Debe introducir alguna foto')}
    }catch(error){
      console.log(error);
      
    }
  
  };

  const cancel = ()=>{
    setMsgError('')
    setShowForm(false)
  }

  return (
    <>
      <div className="d-flex flex-wrap gap-2 m-3">
        {images.map((elem) => {
          return (
            <div>
              <div key={elem.image_id} className="cont-img">
                <img
                  className="img-ppal"
                  src={`${import.meta.env.VITE_SERVER_IMAGES}/travels/${
                    elem.file
                  }`}
                  alt=""
                />
                <img className="delete-icon" src={delete_icon} alt="" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="">
        {!showForm ? (
          <Button onClick={() => setShowForm(true)}>Añadir Fotos</Button>
        ) : (
          <div>
            <input type="file" multiple onChange={handleChange} />
            <p className='error-msg'>{msgError}</p>
            <Button onClick={addPicture}>Aceptar</Button>
            <Button onClick={cancel}>Cancelar</Button>
          </div>
        )}
      </div>
    </>
  );
};
