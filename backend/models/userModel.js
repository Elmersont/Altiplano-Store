import { pool } from '../config/db.js';

const addUser = async ({ nombre, email, password, telefono, region, ciudad, direccion }) => {
    try {
        const sql = 'INSERT INTO usuarios(nombre, email, password, telefono, region, ciudad, direccion) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *';
        const values = [nombre, email, password, telefono, region, ciudad, direccion];
        const response = await pool.query(sql, values);
        return response.rowCount > 0 ? response.rows[0] : false;
    } catch (error) {
        console.log('Error', error.message);
    }
};

const getUserByEmail = async (email) => {
    try {
        const sql = 'SELECT * FROM usuarios WHERE email = $1';
        const response = await pool.query(sql, [email]);
        return response.rowCount > 0 ? response.rows[0] : false;
    } catch (error) {
        console.log('Error', error.message);
    }
};

const updateUserProfile = async (userId, { nombre, email, telefono, region, ciudad, direccion }) => {
    try {
        const sql = `
            UPDATE usuarios 
            SET nombre = $1, email = $2, 
                telefono = $3, region = $4, ciudad = $5, direccion = $6
            WHERE id = $7
            RETURNING *;
        `;
        const values = [nombre, email, telefono, region, ciudad, direccion, userId];
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
