// server/app.js
import express from 'express';
import mongoose from 'mongoose';
import bugsRouter from './src/routes/bugs.js';
import errorHandler from './src/middleware/errorHandler.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/bugs', bugsRouter);

// Global error handler (MUST be last)
app.use(errorHandler);

// Connect to MongoDB (in non-test env)
if (process.env.NODE_ENV !== 'test') {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bugtracker';
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));
}

export default app;