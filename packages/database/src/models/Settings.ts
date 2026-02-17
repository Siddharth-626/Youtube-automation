import { Schema, model, models } from 'mongoose';

const SettingsSchema = new Schema(
  {
    nichePrompt: { type: String, default: 'Entertainment Top 5 facts' },
    videosPerDay: { type: Number, default: Number(process.env.VIDEOS_PER_DAY || 1) },
    scheduleTime: { type: String, default: process.env.UPLOAD_SCHEDULE_TIME || '0 9 * * *' },
    voice: { type: String, default: process.env.EDGE_TTS_VOICE || 'en-US-JennyNeural' },
    duration: { type: Number, default: 30 }
  },
  { timestamps: true }
);

export const Settings = models.Settings || model('Settings', SettingsSchema);
