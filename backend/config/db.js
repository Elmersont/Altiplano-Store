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
    ssl: {
        rejectUnauthorized: false, 
    },
    allowExitOnIdle: true
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