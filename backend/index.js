import express from 'express';
import routes from './routes/routes.js'; 
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config'; 

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
    'http://localhost:5173', // Para desarrollo local
    'https://altiplano-store.onrender.com' // URL de tu frontend en Render
];

app.use(cors({
    origin: (origin, callback) => {
        // Permite solicitudes sin origen (como en Postman) o solicitudes de los dominios permitidos
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true // Asegura que las cookies sean enviadas en las solicitudes
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log('Método:', req.method);
    console.log('Ruta:', req.url);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Cookies:', req.cookies);
    
    next(); 
});

app.use('/', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal, por favor intenta más tarde.');
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));


export default app;