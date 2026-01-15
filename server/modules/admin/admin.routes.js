import express from 'express'
import adminController from './admin.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.get('/allUsers', verifyToken, adminController.allUsers)
router.put('/disableUser/:user_id', verifyToken, adminController.disableUser)
router.put('/enableUser/:user_id', verifyToken, adminController.enableUser)

export default router; 