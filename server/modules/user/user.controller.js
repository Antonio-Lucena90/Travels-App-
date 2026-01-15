import { compareString } from "../../utils/bcryptUtils.js";
import { generateToken } from "../../utils/tokenUtils.js";
import userDal from "./user.dal.js";
import bcrypt from 'bcrypt'

class UserController {
  register = async(req, res)=>{
      try{
        console.log(req.body);
        const {name, email, password} = req.body;
        let hashedPass = await bcrypt.hash(password, 10);
        let result = await userDal.register([name, email, hashedPass])
        res.status(200).json(result)
      }catch(error){
        console.log(error)
        res.status(500).json(error)
      }  
  }
  login = async(req, res)=>{
    
    const {email, password} = req.body
    console.log(email, password);
    try{
      let result = await userDal.findUserByEmail(email);
      console.log(result);
      
        if(result.length === 0){
        res.status(401).json({message: 'Email no existe'})
        }else{
        let match = await compareString(password, result[0].password);
           if(!match){
          res.status(401).json({message:'Password incorrecta'})
           }else{
          const token = generateToken(result[0].user_id);
          res.status(200).json({message:'login ok', token})
        }
      }   
    }catch(error){
      res.status(500).json(error)
    }
  }

  userByToken = async(req, res)=>{
    const {user_id} = req;
    try{
      const result = await userDal.userByToken(user_id);

      res.status(200).json({
            message:'ok', 
            user: result.user, 
            travels:result.travels})
    }catch(error){
      res.status(500).json(error)
    }
  }

  editUser = async(req, res)=>{
    try{
      const {name, lastname, phone, birth_date, user_id} = JSON.parse(req.body.editUser);
      let values = [name, lastname, phone, birth_date, user_id];
      if(req.file){
        values = [name, lastname, phone, birth_date, req.file.filename, user_id]
      }
      await userDal.editUser(values)
      
      res.status(200).json({
                      message: 'Update ok',
                      newAvatar: req.file?.filename})
    }catch(error){
      res.status(500).json(error)
    }
  }

  allUserTravels = async(req, res)=>{
     try{
      let result = await userDal.allUserTravels()
      res.status(200).json({result})
    }catch(error){
      res.status(500).json(error)
    }
  }

  userById = async(req, res) => {
    const {id} = req.params
      try{
      let [result] = await userDal.userById([id])
      res.status(200).json({result})
    }catch(error){
      res.status(500).json(error)
  }
}
}

export default new UserController(); 