// server/server.js
import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test' && mongoose.connection.readyState === 0) {
  if (!process.env.MONGODB_URI) {
    console.error('❌ Missing MONGODB_URI in .env file');
    console.error('👉 Create a server/.env file with your MongoDB Atlas URI');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});