import express from 'express';
import { userController } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/verifyToken.js'; // Importamos el middleware
const router = express.Router();

router.get('/', userController.home);

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/protected', verifyToken, userController.verifyToken);

router.all('*', userController.notFound);

export default router;
