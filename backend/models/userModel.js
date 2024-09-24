import { pool } from '../config/db.js';

const addUser = async ({ nombre, apellido, nombreUsuario, email, password }) => {
    try {
        const sql = 'INSERT INTO usuarios(nombre, apellido, nombreUsuario, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [nombre, apellido, nombreUsuario, email, password];
        const response = await pool.query(sql, values);
        return response.rowCount > 0 ? response.rows[0] : false;
    } catch (error) {
        console.log('Error', error.message);
        throw new Error('Error al crear el usuario');
    }
};

const getUserByEmail = async (email) => {
    try {
        const sql = 'SELECT * FROM usuarios WHERE email = $1';
        const response = await pool.query(sql, [email]);
        return response.rowCount > 0 ? response.rows[0] : false;
    } catch (error) {
        console.log('Error', error.message);
        throw error;
    }
};

const updateUserProfile = async (userId, { nombre, apellido, nombreUsuario, email, telefono, region, ciudad, direccion }) => {
    try {
        const sql = `
            UPDATE usuarios 
            SET nombre = $1, apellido = $2, nombreUsuario = $3, email = $4, 
                telefono = $5, region = $6, ciudad = $7, direccion = $8
            WHERE id = $9
            RETURNING *;
        `;
        const values = [nombre, apellido, nombreUsuario, email, telefono, region, ciudad, direccion, userId];
        const result = await pool.query(sql, values);
        return result.rowCount > 0 ? result.rows[0] : false;
    } catch (error) {
        console.log('Error actualizando el perfil del usuario:', error.message);
        throw error;
    }
};

export const userModel = {
    addUser,
    getUserByEmail,
    updateUserProfile
};
