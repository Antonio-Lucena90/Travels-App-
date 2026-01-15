import adminDal from "./admin.dal.js"

class AdminController {

  allUsers = async(req, res)=>{
    try{
      let result = await adminDal.allUsers()
      res.status(200).json({message: 'ok', result})
    }catch(error){
      res.status(500).json(error)
    }
  }

  disableUser = async(req, res) =>{
    const {user_id} = req.params
       try{
      let result = await adminDal.disableUser([user_id])
      res.status(200).json({message: 'baneado ok', result})
    }catch(error){
      console.log(error);
      
      res.status(500).json(error)
    }
  }

  enableUser = async(req, res) =>{
    const {user_id} = req.params
       try{
      let result = await adminDal.enableUser([user_id])
      res.status(200).json({message: 'baneado ok', result})
    }catch(error){
      console.log(error);
      
      res.status(500).json(error)
    }
  }

}
export default new AdminController()