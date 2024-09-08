import express from 'express';
import routes from './routes/routes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use('/', routes);
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`listening on port http://localhost:${PORT}`));
}

export default app;
