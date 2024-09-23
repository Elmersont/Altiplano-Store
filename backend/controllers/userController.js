import { userModel } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const home = (req, res) => {
    res.send('Home Page');
};

const register = async (req, res) => {
    try {
      const { nombre, email, password, telefono, region, ciudad, direccion } = req.body;

      console.log('Datos recibidos en el backend:', req.body);
  
      // Verifica que todos los campos están presentes
      if (!nombre || !email || !password || !telefono || !region || !ciudad || !direccion) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const result = await userModel.addUser({
        nombre,
        email,
        password: hashedPassword,
        telefono,
        region,
        ciudad,
        direccion
      });
  
      if (result) {
        res.status(200).json({ message: 'Usuario creado con éxito' });
      } else {
        res.status(400).json({ message: 'Error al crear el usuario' });
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };

  const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Email:', email); // Verifica si el email se está recibiendo correctamente
        console.log('Password:', password); // Verifica si el password se está recibiendo correctamente
        
        const user = await userModel.getUserByEmail(email);
        
        if (!user) {
            return res.status(401).send('Usuario no existe');
        }

        console.log('User found:', user); // Verifica si el usuario fue encontrado

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password is valid:', isPasswordValid); // Verifica si la contraseña es válida

        if (!isPasswordValid) {
            return res.status(401).send('Contraseña incorrecta');
        }

        const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res
            .status(200)
            .cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
            .send({ message: 'User logged in', token });
    } catch (error) {
        console.error('Error en el login:', error); // Muestra cualquier error
        res.status(500).send('Error en el login');
    }
};

const verifyToken = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Acceso denegado');
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).send('Token verificado correctamente');
    } catch (error) {
        res.status(403).send('Token inválido');
    }
};

const notFound = (req, res) => {
    res.status(404).send('404 - Page not found');
};

export const userController = {
    home,
    register,
    login,
    verifyToken,
    notFound
};
