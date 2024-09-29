import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const config = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    allowExitOnIdle: true,

    ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false }  // Habilitar SSL en producción (por ejemplo, Render)
    : false  // Desactivar SSL en desarrollo local
};
    


export const pool = new Pool(config);

pool.connect()
    .then(client => {
        console.log("Conexión a la base de datos exitosa.");
        client.release();
    })
    .catch(err => {
        console.error("Error al conectar a la base de datos:", err);
    });