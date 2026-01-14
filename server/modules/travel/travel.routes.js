import express from 'express';
import travelController from './travel.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { uploadImages } from '../../middleware/multiMulter.js';


const router = express.Router();

router.post('/newTravel', verifyToken, uploadImages('travels'), travelController.newTravel)
router.get('/getImages/:travel_id', verifyToken, travelController.getImages)
router.post('/addPictures/:travel_id', verifyToken, uploadImages('travels') , travelController.addPictures)
router.delete('/delTravel/:travel_id', verifyToken, travelController.delTravel)
router.put('/delLogicTravel/:travel_id', verifyToken, travelController.delLogicTravel)

export default router;