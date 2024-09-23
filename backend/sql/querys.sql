--psql
CREATE DATABASE "altiplano";
-- \l
-- \c altiplano

CREATE TABLE IF NOT EXISTS usuarios(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL,
    telefono INTEGER NOT NULL,
    region VARCHAR(50) NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    direccion VARCHAR(100) NOT NULL
);

ALTER TABLE usuarios ALTER COLUMN password TYPE VARCHAR(500);

INSERT INTO usuarios (nombre, email, password, telefono, region, ciudad, direccion) VALUES
('Elmerson', 'mail1@gmail.com', 'contraseña1', 00000001, 'metropolitana', 'santiago', 'dirección1'),
('Juanca', 'mail2@gmail.com', 'contraseña2', 00000002, 'metropolitana', 'santiago', 'dirección1'),
('Vicky', 'mail3@gmail.com', 'contraseña3', 00000003, 'metropolitana', 'santiago', 'dirección1');

Select * FROM usuarios;