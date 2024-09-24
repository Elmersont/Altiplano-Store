import express from 'express';
import { userController } from '../controllers/userController.js';
import { autentificaciónMiddleware } from '../middlewares/autentificaciónMiddleware.js'; 

const router = express.Router();

router.get('/', userController.home);
router.post('/register', userController.register);
router.post('/login', userController.login);


router.get('/protected', autentificaciónMiddleware, userController.verifyToken);
router.get('/favorites', autentificaciónMiddleware, userController.getFavorites);
router.delete('/favorites/:id', autentificaciónMiddleware, userController.deleteFavorite); 

router.post('/user/update-profile', autentificaciónMiddleware, userController.updateProfile);

router.all('*', userController.notFound);

export default router;
