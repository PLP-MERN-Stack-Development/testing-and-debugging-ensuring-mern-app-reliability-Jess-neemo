// server/src/models/Bug.js
import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Bug', bugSchema);