import {pool} from '../config/db.js'
import bcrypt from 'bcryptjs';

const addUser = async ({ nombre, email, password, telefono, region, ciudad, direccion }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const sql = 'INSERT INTO usuarios(nombre, email, password, telefono, region, ciudad, direccion) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *';
        const values = [nombre, email, hashedPassword, telefono, region, ciudad, direccion];
        
        const response = await pool.query(sql, values);
        return response.rowCount > 0 ? response.rows : false;
    } catch (error) {
        console.log('Error', error.message);
        throw error;
    }
};

const getUser = async ({email,password}) => {
    try{
        const sql = 'SELECT * FROM usuarios WHERE email = $1 AND password = $2'
        const values = [email,password]

        const response = await pool.query(sql,values)
        if(response.rowCount > 0){
            return response.rows
        } else {
            return false
        }
    } catch (error){
        console.log('Error', error.message)
    }
}

export const userModel = {
    addUser,
    getUser
}
