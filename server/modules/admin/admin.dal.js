import excuteQuery from "../../config/db.js";

class AdminDal {
  allUsers = async ()=>{
    try{  
      let sql = 'SELECT * FROM user WHERE type = 1'
      return await excuteQuery(sql)
    }catch(error){
      throw error;
    }
  }

  disableUser = async (user_id)=>{
      try{  
      let sql = 'UPDATE user SET user_is_deleted = 1 WHERE user_id = ?'
      return await excuteQuery(sql, user_id)
    }catch(error){
      throw error;
    }
  }
  enableUser = async (user_id)=>{
      try{  
      let sql = 'UPDATE user SET user_is_deleted = 0 WHERE user_id = ?'
      return await excuteQuery(sql, user_id)
    }catch(error){
      throw error;
    }
  }
}

export default new AdminDal()