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
        
        // Encriptar la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.addUser({ nombre, email, password: hashedPassword, telefono, region, ciudad, direccion });
        
        if (result) {
            res.status(200).send('Usuario creado con éxito');
        } else {
            res.status(400).send('Error al crear el usuario');
        }
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

        // Comparar la contraseña encriptada con la proporcionada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Contraseña incorrecta');
        }

        const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res
            .status(200)
            .cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }) // 'secure' solo en producción
            .send('User logged in');
    } catch (error) {
        res.status(500).send('Error en el login');
    }
};

const verifyToken = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Acceso denegado');
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
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
