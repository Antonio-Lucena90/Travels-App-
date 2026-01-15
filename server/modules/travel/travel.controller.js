import { deleteFile } from "../../utils/fileSystemUtils.js";
import travelDal from "./travel.dal.js";

class TravelController {
  newTravel = async(req, res)=>{
    try{
     const {title, country, city, description} = JSON.parse(req.body.newTravel);
     const {user_id} = req

      let data ={
        title,
        country,
        city,
        description,
        user_id,
        images: req.files
      }
      const travelId = await travelDal.newTravel(data)
      res.status(201).json({message: 'ok', travelId})
    }catch(error){
      console.log(error);
      
    }
  }
  getImages = async(req, res)=>{
    const {travel_id} = req.params
    try{
      const result = await travelDal.getImages([travel_id]);
      res.status(200).json(result);
    }catch(error){
      console.log(error);
      res.status(500).json(error);
      
    }
  }
  addPictures = async(req, res)=>{
    const {travel_id} = req.params
    try{
      const updatePics = await travelDal.addPictures(req.files, travel_id);
      res.status(200).json({
                            message: 'ok',
                            updatePics
                          });
    }catch(error){
      res.status(500).json(error)
    }
  }
  
  delTravel = async(req, res) => {
    const {travel_id} = req.params
    try{
      await travelDal.delTravel([travel_id])
      //borrar los archivos físicos de la carpeta travels del back
      res.status(204).json('borrado ok')
    }catch(error){
      res.status(500).json(error)
    }
  }

  delLogicTravel = async(req,res) => {
    const {travel_id} = req.params;
    try{
      await travelDal.delLogicTravel([travel_id])
      res.status(204).json({message: 'borrado Log ok'})
    }catch(error){
      res.status(500).json(error)
    }
  }

  editTravel = async(req, res) => {
    const {title, country, city, description, travel_id} = req.body
    try{
      await travelDal.editTravel([title, country, city, description, travel_id])
      res.status(200).json({message:'edit ok'})
    }catch(error){
      res.status(500).json(error)
    }
  }

  delImage = async(req, res)=>{
    const {image_id, travel_id, filename} = req.body
    try{
      await travelDal.delImage([image_id, travel_id]);
      //borrar archivos
      await deleteFile(filename, 'travels');
      res.status(200).json({message:'delete ok'})
    }catch(error){
      res.status(500).json(error)
    }
  }
}

export default new TravelController();