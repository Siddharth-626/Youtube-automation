import { Schema, model, models } from 'mongoose';

const LogSchema = new Schema({
  message: { type: String, required: true },
  level: { type: String, enum: ['info', 'error', 'warn'], default: 'info' },
  timestamp: { type: Date, default: Date.now },
  jobId: { type: Schema.Types.ObjectId, ref: 'Job' }
});

export const Log = models.Log || model('Log', LogSchema);
