import mongoose from 'mongoose';

export default async function connectToMongoDB(): Promise<void> {
  const uri = 'mongodb://0.0.0.0:27017/avittathur';
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
