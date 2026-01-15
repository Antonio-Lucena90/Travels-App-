import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '../../helpers/axiosHelpers.js'
import { AuthContext } from '../../contexts/AuthContext/AuthContext.js'
import './travelsPicsGallery.css';
import delete_icon from '../../assets/icons/delete.svg'
import { Button } from 'react-bootstrap';

export const TravelsPicsGallery = ({ travel_id }) => {
    const [showForm, setShowForm] = useState(false);
    const [images, setImages] = useState([]);
    const [newPics, setNewPics] = useState();
    const [msgError, setMsgError] = useState("");
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetcPics = async () => {
            try {
                const res = await fetchData(`travel/getImages/${travel_id}`, "GET", null, token);
                setImages(res.data)

            } catch (error) {
                console.log(error);
            }
        }

        fetcPics();
    }, [])

    const handleChange = (e) => {
        setNewPics(e.target.files)
    }

    const addPictures = async () => {
        try {
            if (newPics) {
                const newForData = new FormData();
                for (const elem of newPics) {
                    newForData.append("img", elem)
                }
                const res = await fetchData(`travel/addPictures/${travel_id}`, "POST", newForData, token)
                console.log(res.data);
                setImages(res.data.updatePics);
                setShowForm(false);
                
            } else {
                setMsgError("Debes añadir alguna foto")
            }

        } catch (error) {
            console.log(error);
        }
    }

    const cancelar = () => {
        setMsgError("");
        setShowForm(false);
    }

    const deleteImg = async(image_id, filename) => {
        let data = {
            image_id,
            travel_id,
            filename
        }
        try {
            let res = await fetchData("travel/delImage", "POST", data, token);
            //actualizar el DOM
            setImages(images?.filter(elem=>elem.image_id !== image_id))

            console.log(res);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='d-flex flex-wrap gap-2 m-3'>
                {images?.map((elem) => {
                    return (
                        <div key={elem.image_id} className='cont-img'>
                            <img
                                className='img-ppal'
                                src={`${import.meta.env.VITE_SERVER_IMAGES}/travels/${elem.file}`}
                                alt=""
                            />
                            <img 
                                className='delete-icon' 
                                src={delete_icon} alt="" 
                                onClick={()=>deleteImg(elem.image_id, elem.file)}
                            />
                        </div>
                    )
                })}
            </div>
            <div className='mt-4'>
                {!showForm ?
                    <Button onClick={() => setShowForm(true)}>Añadir fotos</Button>
                    :
                    <div>
                        <input
                            type="file"
                            multiple
                            onChange={handleChange}
                        />
                        <p className='error-msg'>{msgError}</p>
                        <Button onClick={addPictures}>aceptar</Button>
                        <Button onClick={cancelar}>cancelar</Button>
                    </div>
                }
            </div>
        </>
    )
}