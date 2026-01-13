import express from 'express';
import userController from './user.controller.js'
import { verifyToken } from '../../middleware/verifyToken.js';
import { uploadImage } from '../../middleware/singleMulter.js';

const router = express.Router();

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/userByToken', verifyToken, userController.userByToken)

router.put('/editUser', verifyToken, uploadImage('users'), userController.editUser);

export default router; 