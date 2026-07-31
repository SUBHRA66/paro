import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'auth',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/auth', authRouter);

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
