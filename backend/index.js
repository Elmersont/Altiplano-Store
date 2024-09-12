import express from 'express';
import routes from './routes/routes.js'
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser())
app.use('/',routes);
app.use(express.urlencoded({extended:true}));

app.listen(PORT, () => console.log (`listening on port http://localhost:${PORT}`))
