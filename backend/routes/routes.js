// routes.js
import express from 'express';
import { userController } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/autentificaciónMiddleware.js';

const router = express.Router();

// Rutas sin autentificación
router.get('/', userController.home); 
router.post('/register', userController.register); 
router.post('/login', userController.login); 

// Rutas protegida
router.get('/protected', verifyToken, userController.protectedRoute);

// Ruta para manejar 404
router.get('*', userController.notFound); 

export default router;