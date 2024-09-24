import bcrypt from 'bcryptjs';
import { pool } from './config/db.js'; 

const actualizarContraseñas = async () => {
  try {
    const usuarios = [
      { email: 'juan1@example.com', newPassword: 'Password123' },
      { email: 'ana2@example.com', newPassword: 'Password123' },
      { email: 'pedro3@example.com', newPassword: 'Password123' },
      { email: 'maria4@example.com', newPassword: 'Password123' },
      { email: 'luis5@example.com', newPassword: 'Password123' },
      { email: 'laura6@example.com', newPassword: 'Password123' },
      { email: 'carlos7@example.com', newPassword: 'Password123' },
      { email: 'sofia8@example.com', newPassword: 'Password123' },
      { email: 'miguel9@example.com', newPassword: 'Password123' },
      { email: 'isabel10@example.com', newPassword: 'Password123' },
      { email: 'diego11@example.com', newPassword: 'Password123' },
      { email: 'paula12@example.com', newPassword: 'Password123' },
      { email: 'raul13@example.com', newPassword: 'Password123' },
      { email: 'sara14@example.com', newPassword: 'Password123' },
      { email: 'fernando15@example.com', newPassword: 'Password123' },
      { email: 'camila16@example.com', newPassword: 'Password123' },
      { email: 'jorge17@example.com', newPassword: 'Password123' },
      { email: 'lucia18@example.com', newPassword: 'Password123' },
      { email: 'pablo19@example.com', newPassword: 'Password123' },
      { email: 'elena20@example.com', newPassword: 'Password123' },
      { email: 'tomas21@example.com', newPassword: 'Password123' },
      { email: 'martina22@example.com', newPassword: 'Password123' },
      { email: 'andres23@example.com', newPassword: 'Password123' },
      { email: 'valentina24@example.com', newPassword: 'Password123' },
      { email: 'javier25@example.com', newPassword: 'Password123' },
      { email: 'marta26@example.com', newPassword: 'Password123' },
      { email: 'ramon27@example.com', newPassword: 'Password123' },
      { email: 'natalia28@example.com', newPassword: 'Password123' },
      { email: 'oscar29@example.com', newPassword: 'Password123' },
      { email: 'veronica30@example.com', newPassword: 'Password123' },
      { email: 'juan@example.com', newPassword: 'Password123' },
      { email: 'altiplano@store.cl', newPassword: 'Password123' },
    ];

    for (const usuario of usuarios) {
      const hashedPassword = await bcrypt.hash(usuario.newPassword, 10);

      await pool.query(
        'UPDATE usuarios SET password = $1 WHERE email = $2',
        [hashedPassword, usuario.email]
      );

      console.log(`Contraseña actualizada para: ${usuario.email}`);
    }

    console.log('Todas las contraseñas han sido actualizadas.');
  } catch (error) {
    console.error('Error actualizando las contraseñas:', error.message);
  } finally {
    pool.end();
  }
};

actualizarContraseñas();
