import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.USER_PORT || process.env.PORT || 7002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/paro_auth';

connectDB(MONGO_URI)
  .then(() => {
    console.log(`[User Service] Database connected successfully`);
  })
  .catch((err) => {
    console.log(`[User Service] Database connection failed:`, err.message);
  });

app.listen(PORT, () => {
  console.log(`[User Service] Running on port ${PORT}`);
});