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
        const result = await userModel.addUser({ nombre, email, password, telefono, region, ciudad, direccion });
        res.send('Usuario creado con éxito');
        console.log(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(401).send('Usuario no existe');
        }

        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
            return res.status(401).send('Contraseña incorrecta');
        }

        const token = jwt.sign({ email, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
        res.status(200).cookie('token', token, { httpOnly: true }).send('User logged in');
    } catch (error) {
        res.status(500).send('Error en el servidor');
        console.log('Error', error.message);
    }
};

// Elimina la lógica de verificación de token del controlador
const protectedRoute = (req, res) => {
    res.send('Esta es una ruta protegida');
};

const notFound = (req, res) => {
    res.send('404 - Page not found');
};

export const userController = {
    home,
    register,
    login,
    protectedRoute, // Asegúrate de tener una ruta protegida para demostrar el uso
    notFound
};
