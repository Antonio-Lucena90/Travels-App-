 import excuteQuery, {dbPool} from '../../config/db.js'
 class TravelDal {
  newTravel = async(data)=>{
    const {title, country, city, description, user_id, images} = data;

    const connection = await dbPool.getConnection();
    
    try{
      await connection.beginTransaction();
      //Insercion del viaje
      let sql = 'INSERT INTO travel (title, country, city, description, user_id) VALUES (?,?,?,?,?)'
      let values = [title, country, city, description, user_id]
      let result = await connection.query(sql, values)
      console.log(result);

      //rescato el travel_id recien creado en la Insercion
      const travelId = result[0].insertId

      //2º Inserción de las imágenes del viaje (si hubiera)
      let idImage = 0;
      images.forEach(async(image) => {
        let sql = 'INSERT INTO gallery (travel_id, image_id, file) VALUES (?,?,?)'
        idImage++;
        let values = [travelId, idImage, image.filename]
        await connection.query(sql, values); 
      });
      //confirma el guardado en la base de datos 
      await connection.commit();
      return travelId 
    }catch(error){
      //si hay un error revertimos todo
      connection.rollback();
      throw error
    }finally{
      if(connection){
        connection.release();
      }
    }
  }

  getImages = async(travel_id)=>{
    try{
      let sql = 'SELECT * FROM gallery WHERE image_is_deleted = 0 AND travel_id = ?'
      const result = await excuteQuery(sql, travel_id)
      return result; 
    }catch(error){
      throw error
    }
  }

  addPictures = async(files, travel_id)=>{
    const connection = await dbPool.getConnection();
    try{  
      await connection.beginTransaction();
      //averiguar cual es el image_id mas alto
      let sql = 'SELECT IFNULL(MAX(image_id), 0) AS max_id FROM gallery WHERE travel_id = ?'

      let [result] = await connection.query(sql, [travel_id]);
      let maxId = result[0].max_id;
      
      //bucle para insertar las fotos

      files.forEach(async(elem)=>{
        maxId++;
        let sqlImages = 'INSERT INTO gallery (travel_id, image_id, file) VALUES (?,?,?)'
        let values = [travel_id, maxId, elem.filename]; 
        await connection.query(sqlImages, values)
      })

      let sqlUpdateFiles = 'SELECT * FROM gallery WHERE travel_id = ? AND image_is_deleted = 0'
      let [updatePics] = await connection.query(sqlUpdateFiles, [travel_id])
      await connection.commit();
      return updatePics;
    }catch(error){
      await connection.rollback();
      throw error;
    }finally{
      if(connection){
        connection.release();
      }
    }
  }

  delTravel = async(travel_id)=>{
    try{
      let sql = 'DELETE FROM travel WHERE travel_id = ?'
      await excuteQuery(sql, travel_id)
    }catch(error){
      throw error;  
    }
  }

  delLogicTravel = async(travel_id)=>{
    try{
      let sql = 'UPDATE travel LEFT JOIN gallery ON travel.travel_id = gallery.travel_id set travel.travel_is_deleted = 1, gallery.image_is_deleted = 1 WHERE travel.travel_id = ?'
      await excuteQuery(sql, travel_id);
      
    }catch(error){
      throw error
    }
  }

  editTravel = async(values)=>{
    try{
      let sql = 'UPDATE travel SET title=?, country=?, city=?, description=? WHERE travel_id = ?'
      await excuteQuery(sql, values)
    }catch(error){
      throw error
    }
  }

  delImage = async(values)=>{
    try{
      let sql = 'DELETE FROM gallery WHERE image_id = ? AND travel_id = ?'
      await excuteQuery(sql, values)
    }catch(error){
      throw error
    }
  }
}

export default new TravelDal; 