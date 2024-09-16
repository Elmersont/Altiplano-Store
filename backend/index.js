import express from 'express';
import routes from './routes/routes.js'; 
import cookieParser from 'cookie-parser'; 
import 'dotenv/config'; 

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 

app.use('/', routes); 


if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
}

export default app;

