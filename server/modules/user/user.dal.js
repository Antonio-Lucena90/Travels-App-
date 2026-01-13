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
      let sql = 'SELECT user_id, name, lastname, avatar, birth_date, email, phone, type FROM user WHERE user_id = ? AND user_is_deleted = 0'
      let result = await excuteQuery(sql, [id])
      return result 
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