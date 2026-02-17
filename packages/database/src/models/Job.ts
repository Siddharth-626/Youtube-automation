import { Schema, model, models } from 'mongoose';

const JobSchema = new Schema({
  status: { type: String, enum: ['queued', 'running', 'completed', 'failed'], default: 'queued' },
  startedAt: { type: Date },
  completedAt: { type: Date },
  errorMessage: { type: String },
  logs: [{ type: String }]
});

export const Job = models.Job || model('Job', JobSchema);
