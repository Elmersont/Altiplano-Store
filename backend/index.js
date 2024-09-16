import express from 'express';
import routes from './routes/routes.js'; 
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config'; 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: process.env.STATIC_SITE || '*', 
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
