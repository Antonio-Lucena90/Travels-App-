import excuteQuery from "../../config/db.js";

class UserDal{
  register = async (values)=>{
    try{
      let sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
      let result = await excuteQuery(sql, values)
      return result
    }catch(error){
      throw error
    }
  }

  findUserByEmail = async(email)=>{
    console.log(email);
    
    try{
      let sql = 'SELECT user_id, password FROM user WHERE email = ? AND user_is_deleted = 0';
      let result = await excuteQuery(sql,[email])
      return result
    }catch(error){
      throw error
    }
  }

  userByToken = async(id)=>{
    try{
      // let sql = 'SELECT user_id, name, lastname, avatar, birth_date, email, phone, type FROM user WHERE user_id = ? AND user_is_deleted = 0'
      let sql = 'SELECT u.user_id, u.name, u.lastname, u.avatar, u.birth_date, u.email, u.phone, u.type, t.title, t.country, t.description, t.city, t.travel_id FROM user AS u LEFT JOIN travel AS t ON u.user_id = t.user_id AND u.user_is_deleted = 0 AND t.travel_is_deleted = 0 WHERE u.user_id = ?'
      let result = await excuteQuery(sql, [id])
      console.log('lllllllll', result);

      const travels = [];
      const user = {
        user_id: result[0].user_id,
        name: result[0].name,
        lastname: result[0].lastname,
        email: result[0].email,
        avatar: result[0].avatar,
        phone: result[0].phone,
        birth_date: result[0].birth_date,
        type: result[0].type,
      }

      result.forEach(e=>{
        if(e.travel_id){
          travels.push({
            user_id: e.user_id,
            travel_id: e.travel_id,
            title: e.title,
            country: e.country,
            city: e.city,
            description: e.description
          })
        }
      })
      
      return {user, travels}; 

    }catch (error){
      throw error
    }
  }

  editUser = async (values)=>{
    try{
      //si no viene foto:
      let sql = 'UPDATE user SET name=?, lastname=?, phone=?, birth_date=? WHERE user_id = ? AND user_is_deleted = 0'
      //si viene foto:
      if(values.length === 6){
        sql = 'UPDATE user SET name=?, lastname=?, phone=?, birth_date=?, avatar=? WHERE user_id = ? AND user_is_deleted = 0' 
      }
      await excuteQuery(sql, values);
    }catch(error){
      throw error;
    }
  }
}
export default new UserDal();