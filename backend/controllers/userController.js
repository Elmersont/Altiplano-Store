import { userModel } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const home = (req, res) => {
    res.send('Home Page');
};

// Controlador para registrar un nuevo usuario
const register = async (req, res) => {
    try {
        const { nombre, apellido, nombreUsuario, email, password, telefono, region, ciudad, direccion } = req.body;

        // Verifica si el correo ya está registrado
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).send('El correo ya está registrado. Por favor, usa otro correo.');
        }

        // Hashea la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea el nuevo usuario
        const result = await userModel.addUser({
            nombre,
            apellido,
            nombreUsuario,
            email,
            password: hashedPassword,
            telefono: telefono || '', 
            region: region || '',
            ciudad: ciudad || '',
            direccion: direccion || '',
        });

        if (result) {
            res.status(200).send('Usuario creado con éxito');
        } else {
            res.status(400).send('Error al crear el usuario');
        }
    } catch (error) {
        console.error('Error en el registro:', error.message);
        res.status(500).send('Error en el registro. Por favor, intenta más tarde.');
    }
};

// Controlador para iniciar sesión
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.getUserByEmail(email);

        if (!user) {
            return res.status(401).send('Usuario no existe');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Contraseña incorrecta');
        }

        const token = jwt.sign(
            { email: user.email, id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Enviar la respuesta con los datos del usuario y el token
        res
            .status(200)
            .cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' })
            .send({
                message: 'User logged in',
                user: {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    nombreUsuario: user.nombreUsuario,
                    email: user.email,
                    telefono: user.telefono || '', // Datos opcionales
                    region: user.region || '',
                    ciudad: user.ciudad || '',
                    direccion: user.direccion || '',
                },
                token
            });
    } catch (error) {
        console.error('Error en el login:', error.message);
        res.status(500).send('Error en el login');
    }
};

// Controlador para verificar el token
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

// Controlador para validar el token
const validateToken = (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Token no proporcionado');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ email: decoded.email });
    } catch (error) {
        res.status(403).send('Token inválido');
    }
};

// Controlador para actualizar el perfil del usuario
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { nombre, apellido, nombreUsuario, email, telefono, region, ciudad, direccion } = req.body;

        if (!nombre || !apellido || !nombreUsuario || !email) {
            return res.status(400).send('Nombre, apellido, nombre de usuario y correo electrónico son obligatorios.');
        }

        const updatedUser = await userModel.updateUserProfile(userId, {
            nombre,
            apellido,
            nombreUsuario,
            email,
            telefono,
            region,
            ciudad,
            direccion,
        });

        if (updatedUser) {
            res.status(200).send('Perfil actualizado con éxito.');
        } else {
            res.status(400).send('Error al actualizar el perfil.');
        }
    } catch (error) {
        console.error('Error al actualizar el perfil:', error.message);
        res.status(500).send('Error en el servidor. Intenta más tarde.');
    }
};

// Controlador para obtener los favoritos del usuario
const getFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const favorites = await userModel.getFavorites(userId);

        res.status(200).json({ favoritos: favorites });
    } catch (error) {
        res.status(500).send('Error al obtener los favoritos');
    }
};

// Controlador para eliminar un favorito
const deleteFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const favoriteId = req.params.id;
        const result = await userModel.deleteFavorite(userId, favoriteId);

        if (result) {
            res.status(200).send('Favorito eliminado con éxito');
        } else {
            res.status(400).send('Error al eliminar el favorito');
        }
    } catch (error) {
        res.status(500).send('Error al eliminar el favorito');
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
    validateToken,
    getFavorites,
    deleteFavorite,
    updateProfile,
    notFound,
};
