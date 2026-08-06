import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

app.use(errorHandler);

export default app;
