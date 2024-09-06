import express from 'express';
import { userController } from '../controllers/userController.js';
const router = express.Router()

router.get('/', userController.home)

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/protected',userController.verifyToken)

router.get('*', userController.notFound)

export default router
