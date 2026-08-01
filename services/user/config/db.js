import mongoose from 'mongoose';

const connectDB = async (MONGO_URI) => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
  } catch (error) {
    throw error;
  }
};

export default connectDB;
