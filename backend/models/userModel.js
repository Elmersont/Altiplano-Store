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

export const userModel = {
    addUser,
    getUserByEmail
};
