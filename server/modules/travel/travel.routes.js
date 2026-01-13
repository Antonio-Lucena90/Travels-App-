import express from 'express';
import travelController from './travel.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { uploadImages } from '../../middleware/multiMulter.js';


const router = express.Router();

router.post('/newTravel', verifyToken, uploadImages('travels'), travelController.newTravel)

export default router;