import mongoose, { Schema, model, models } from 'mongoose';

const StorySchema = new Schema({
  title: { type: String },
  description: { type: String },
  imageUrl: { type: String, required: true },
  category: { type: String, default: 'Memory' },
  // Ye field sabse important hai:
  type: { type: String, enum: ['cover', 'featured', 'album'], default: 'album' }, 
  createdAt: { type: Date, default: Date.now },
});

export default models.Story || model('Story', StorySchema);