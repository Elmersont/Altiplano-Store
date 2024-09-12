--psql
CREATE DATABASE "altiplano";
-- \l
-- \c altiplano

CREATE TABLE IF NOT EXISTS usuarios(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    telefono INTEGER NOT NULL,
    region VARCHAR(50) NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    direccion VARCHAR(100) NOT NULL
);

--\q

