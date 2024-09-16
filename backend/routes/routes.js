import express from 'express';
import { userController } from '../controllers/userController.js';
import { autentificaciónMiddleware } from '../middlewares/autentificaciónMiddleware.js'; 

const router = express.Router();

router.get('/', userController.home);
router.post('/register', userController.register);
router.post('/login', userController.login);


router.get('/protected', autentificaciónMiddleware, userController.verifyToken);

router.all('*', userController.notFound);

export default router;
