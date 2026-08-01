import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);

app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'user',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

export default app;