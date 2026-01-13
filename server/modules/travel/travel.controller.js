class TravelController {
  newTravel = async(req, res)=>{
    try{
      
      res.status(200).json('ok')
    }catch(error){
      console.log(error);
      
    }
  }
}

export default new TravelController();