import request from 'supertest';
import app from '../index.js';

describe('API Routes Testing', () => {

  it('should return Home Page', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Home Page');
  });

  it('should create a new user and return success message', async () => {
    const newUser = {
      nombre: 'Juan',
      email: 'juan@example.com',
      password: 'password123',
      telefono: '12345678',
      region: 'Region 1',
      ciudad: 'Ciudad 1',
      direccion: 'Calle 123'
    };
    const res = await request(app)
      .post('/register')
      .send(newUser);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Usuario creado con éxito');
  });

  it('should log in the user and return a token', async () => {
    const loginUser = {
      email: 'juan@example.com',
      password: 'password123'
    };
    const res = await request(app)
      .post('/login')
      .send(loginUser);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('User logged in');
  });

  it('should deny access to protected route without token', async () => {
    const res = await request(app).get('/protected');
    expect(res.statusCode).toEqual(401);
    expect(res.text).toContain('Acceso denegado');
  });

  it('should grant access to protected route with valid token', async () => {
    const loginUser = {
      email: 'juan@example.com',
      password: 'password123'
    };

    const loginRes = await request(app)
      .post('/login')
      .send(loginUser);
    
    const token = loginRes.headers['set-cookie'][0].split(';')[0].split('=')[1];

    const res = await request(app)
      .get('/protected')
      .set('Cookie', `token=${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Token verificado correctamente');
  }, 10000);

  it('should return 404 for an unknown route', async () => {
    const res = await request(app).get('/unknown');
    expect(res.statusCode).toEqual(404); 
    expect(res.text).toContain('404 - Page not found');
  });
});