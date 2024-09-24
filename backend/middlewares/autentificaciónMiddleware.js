import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const autentificaciónMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Acceso denegado: No se proporcionó un token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).send('Token inválido');
  }
};
