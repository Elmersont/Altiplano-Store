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
        res.status(200).send('Usuario creado con éxito');
        console.log(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.getUser({ email, password });
        if (!user) {
            res.status(401).send('Usuario no existe');
        } else {
            const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res
                .status(200)
                .cookie('token', token, { httpOnly: true, secure: false }) // Añadido 'httpOnly' y 'secure' para mejorar seguridad
                .send('User logged in');
        }
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
        console.log("Data", data);
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
