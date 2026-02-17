import { Schema, model, models } from 'mongoose';

const VideoSchema = new Schema(
  {
    title: { type: String, required: true },
    script: { type: String, required: true },
    status: { type: String, enum: ['pending', 'rendering', 'uploaded', 'failed'], default: 'pending' },
    filePath: { type: String },
    youtubeUrl: { type: String },
    duration: { type: Number, required: true }
  },
  { timestamps: true }
);

export const Video = models.Video || model('Video', VideoSchema);
