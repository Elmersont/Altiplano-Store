# Altiplano Store

Tienda en línea de puertas de granero de diseño chileno, con un cuestionario para personalizar cada puerta. Es el proyecto final del bootcamp Full Stack JavaScript de Desafío Latam, desarrollado en equipo.

## Qué incluye

- Catálogo con tres líneas de puertas (Granjera, Indómita y Nativa) y página de detalle de cada producto.
- Cuestionario de personalización para que el cliente describa la puerta que busca.
- Carrito de compras.
- Registro e inicio de sesión con contraseñas cifradas con bcrypt y sesión mediante JWT en cookie.
- Rutas protegidas en el frontend y en la API, con perfil de usuario editable y lista de favoritos.

## Tecnologías

| Capa | Tecnologías |
|---|---|
| Frontend | React 18, Vite, React Router, React-Bootstrap, Axios |
| Backend | Node.js, Express, JWT, bcryptjs |
| Base de datos | PostgreSQL |
| Pruebas | Jest y Supertest en la API |

## Cómo ejecutarlo en local

Necesitas Node.js y PostgreSQL instalados.

1. Crea la base de datos y las tablas con el script `backend/sql/querys.sql`.
2. En `backend`, crea un archivo `.env` con estas variables: `PORT`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `NODE_ENV` y `JWT_SECRET`.
3. Instala dependencias e inicia la API:

```bash
cd backend
npm install
npm run dev
```

4. En otra terminal, inicia el frontend (queda en `http://localhost:5173`):

```bash
cd frontend
npm install
npm run dev
```

5. Para correr las pruebas de la API:

```bash
cd backend
npm test
```

## Estructura

```
backend/    API REST (rutas, controladores, modelos, middleware de autenticación y pruebas)
frontend/   Aplicación React (páginas, componentes, contexto de autenticación y estilos)
```

## Alcance del proyecto

Es un proyecto académico. El catálogo se define en el frontend, el carrito se guarda en el navegador y no incluye pasarela de pago.

## Autor

Elmerson Torres · [Portafolio](https://elmerson-torres.netlify.app) · [LinkedIn](https://www.linkedin.com/in/elmerson-torres-deza-3203a618a/)
