import express from 'express';
import routes from './routes/routes.js'; 
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config'; 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
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