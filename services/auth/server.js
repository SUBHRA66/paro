import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.AUTH_PORT || 7001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/paro_auth';

connectDB(MONGO_URI)
  .then(() => {
    console.log(`[Auth Service] Database connected successfully`);
  })
  .catch(err => {
    console.log("[Auth Service] Database connection failed:", err.message);
  });

app.listen(PORT, () => {
  console.log(`[Auth Service] Running on port ${PORT}`);
});
