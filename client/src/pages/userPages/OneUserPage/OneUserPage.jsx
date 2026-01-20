import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchData } from '../../../helpers/axiosHelpers';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { Button } from 'react-bootstrap';
import './css.css'

const initialValue = {
  comment: '',
};

const OneUserPage = () => {
  const [user2, setUSer2] = useState();
  const [comment, setComment] = useState(initialValue);
  const [newComment, setNewComment] = useState([]);
  const { user_id } = useParams();
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetchData(
        `user/userById/${user_id}`,
        'GET',
        null,
        token
      );
      setUSer2(res.data.result);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetchData(
        `user/getComments/${user_id}`,
        'GET',
        null,
        token
      );
      console.log(res);
      setNewComment(res.data.result);
    };
    fetchComments();
  }, []);

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      let res = await fetchData(
        `user/insertComment/${user_id}/${user.user_id}`,
        'POST',
        comment,
        token
      );
      console.log(res);
      setNewComment([...newComment, res.data.result]);
      setComment(initialValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1>
          Viajero: {user2?.name} {user2?.lastname}
        </h1>
        <img
          src={`${import.meta.env.VITE_SERVER_IMAGES}/users/${user2?.avatar}`}
          alt=""
        />
        <hr />

        <div className="d-flex justify-content-center flex-column align-items-center">
          <div className="border border-5 rounded w-50 text-center">
            <h2>Comentarios</h2>
            {newComment?.map((elem, index) => {
              return <div key={index}>{elem.comment} 
              <img
              className='foto' 
               src={`${import.meta.env.VITE_SERVER_IMAGES}/users/${user?.avatar}`} alt="" />
              </div>;
            })}
            <div className="d-flex flex-column gap-2 w-50 align-items-center">
              <label htmlFor="">Escribe un Comentario</label>
              <input
                type="text"
                placeholder="tu comentario"
                name="comment"
                value={comment.comment}
                onChange={handleChange}
              />
              <Button onClick={onSubmit}>Enviar Comentario</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneUserPage;
